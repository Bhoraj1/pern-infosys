import multer from "multer";
import { errorHandler } from "../utils/error.js";
import cloudinary from "../helper/cloudniaryConfig.js";
import { db } from "../config/db.connect.js";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const postBlog = async (req, res, next) => {
  const { name, title, category, description } = req.body;

  if (!name || !title || !category || !description) {
    return next(errorHandler(400, "All fields are required"));
  }

  if (!req.file) {
    return next(errorHandler(400, "Image file is required"));
  }

  try {
    cloudinary.v2.uploader
      .upload_stream({ folder: "blog" }, async (error, result) => {
        if (error) {
          return next(
            errorHandler(500, "Failed to upload image to Cloudinary")
          );
        }

        const query = `
        INSERT INTO blogs (name, title,category, image, description)
        VALUES ($1, $2,$3, $4, $5)
        RETURNING *;
      `;
        const values = [name, title, category, result.secure_url, description];

        try {
          const { rows } = await db.query(query, values);
          res.status(201).json({
            message: "Blog Post successfully created",
            blog: rows[0],
          });
        } catch (dbError) {
          return next(errorHandler(500, "Error saving blog post to database"));
        }
      })
      .end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await db.query("SELECT * FROM blogs WHERE id = $1", [
        req.params.id,
      ]);
      const blog = result.rows[0];
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      const relatedBlogsResult = await db.query(
        "SELECT * FROM blogs WHERE category = $1 AND id != $2 LIMIT 7",
        [blog.category, req.params.id]
      );
      return res.status(200).json({
        message: "Related Blog retrive successfully !",
        blog,
        relatedBlogs: relatedBlogsResult.rows,
      });
    } else {
      const result = await db.query("SELECT * FROM blogs");
      const blogs = result.rows;
      if (blogs.length === 0) {
        return next(errorHandler(404, "blogs not found"));
      }
      res.status(200).json({
        message: "Blogs retrieved successfully!",
        blogs,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to delete this service")
    );
  }
  try {
    const { rows } = await db.query("SELECT * FROM blogs WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return next(errorHandler(404, "Blog not found"));
    }
    await db.query("DELETE FROM blogs WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to update this blog")
    );
  }

  try {
    const { name, title, category, description } = req.body;
    const { blogId } = req.params;

    const fieldsToUpdate = [];
    const values = [];

    if (name) {
      fieldsToUpdate.push("name");
      values.push(name);
    }

    if (title) {
      fieldsToUpdate.push("title");
      values.push(title);
    }
    if (category) {
      fieldsToUpdate.push("category");
      values.push(category);
    }

    if (description) {
      fieldsToUpdate.push("description");
      values.push(description);
    }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "blogs" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        // Pass the file buffer to the upload stream
        uploadStream.end(req.file.buffer);
      });

      fieldsToUpdate.push("image");
      values.push(result.secure_url);
    }

    if (fieldsToUpdate.length === 0) {
      return next(errorHandler(400, "No fields to update"));
    }

    values.push(blogId);

    const setClause = fieldsToUpdate
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    // Execute the update query
    const updateQuery = `
      UPDATE blogs 
      SET ${setClause} 
      WHERE id = $${values.length} 
      RETURNING id, name, title,category, image, description
    `;

    const updatedBlog = await db.query(updateQuery, values);

    if (updatedBlog.rowCount === 0) {
      return next(errorHandler(404, "Blog not found"));
    }

    res.status(200).json({
      message: "Blog Post updated successfully",
      updatedBlog: updatedBlog.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

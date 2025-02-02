import multer from "multer";
import { errorHandler } from "../utils/error.js";
import cloudinary from "../helper/cloudniaryConfig.js";
import BlogModel from "../models/blog.model.js";

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// Image filter (check if file is an image)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

// Initialize multer with memory storage
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const postBlog = async (req, res, next) => {
  // console.log(req.file.originalname)
  // console.log(req.body);
  // Extract data from the request body
  const { name, title, description } = req.body;

  // Validate required fields
  if (!name || !title || !description) {
    return next(errorHandler(400, "All fields are required"));
  }

  // Check if an image file was uploaded
  if (!req.file) {
    return next(errorHandler(400, "Image file is required"));
  }

  // Upload image to Cloudinary directly from memory
  try {
    const uploadResult = await cloudinary.v2.uploader.upload_stream(
      { folder: "blog" },
      (error, result) => {
        if (error) {
          return next(
            errorHandler(500, "Failed to upload image to Cloudinary")
          );
        }

        const postBlog = new BlogModel({
          name,
          title,
          image: result.secure_url,
          description,
        });

        postBlog
          .save()
          .then(() => {
            res.status(201).json({
              message: "Blog Post successfully",
              postBlog,
            });
          })
          .catch(next);
      }
    );

    // Pipe the image buffer to the upload stream
    uploadResult.end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    if (req.params.id) {
      const blogs = await BlogModel.findById(req.params.id);
      if (!blogs) {
        return res.status(404).json({ message: "Blog not found" });
      }
      return res.status(200).json(blogs);
    } else {
      const blogs = await BlogModel.find();
      if (blogs.length === 0) {
        return res.status(404).json({
          message: "Review not found",
        });
      }

      res.status(200).json({
        message: "Review retrieved successfully",
        blogs,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to delete this service")
    );
  }
  const blog = await BlogModel.findById(req.params.id);
  if (!blog) {
    return next(errorHandler(404, "Blog not found"));
  }
  try {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateBlogPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to Update this blog")
    );
  }
  try {
    let imageUrl = req.body.image;
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "team" }, (error, result) => {
            if (error) {
              reject(new Error("Failed to upload image to Cloudinary"));
            } else {
              resolve(result.secure_url);
            }
          })
          .end(req.file.buffer);
      });
      imageUrl = uploadResult;
    }

    const updateReview = await BlogModel.findByIdAndUpdate(
      req.params.blogId,
      {
        $set: {
          name: req.body.name,
          title: req.body.title,
          image: imageUrl,
          description: req.body.description,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Blog Post updated successfully",
      updateReview,
    });
  } catch (error) {
    next(error);
  }
};

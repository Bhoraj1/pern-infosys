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

// Initialize multer with memory storage
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const addReview = async (req, res, next) => {
  const { name, review, rating } = req.body;

  if (!name || !review || !rating) {
    return next(errorHandler(400, "All fields are required"));
  }

  if (!req.file) {
    return next(errorHandler(400, "Image file is required"));
  }

  try {
    cloudinary.v2.uploader
      .upload_stream({ folder: "reviews" }, async (error, result) => {
        if (error) {
          return next(
            errorHandler(500, "Failed to upload image to Cloudinary")
          );
        }

        // Insert the blog post data into the database
        const query = `
        INSERT INTO reviews (name, review, rating,image)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
        const values = [name, review, rating, result.secure_url];

        try {
          const { rows } = await db.query(query, values);
          res.status(201).json({
            message: "Review added successfully",
            review: rows[0],
          });
        } catch (dbError) {
          return next(errorHandler(500, "Error saving Review to database"));
        }
      })
      .end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

export const getReview = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await db.query("SELECT * FROM reviews WHERE id = $1", [
        req.params.id,
      ]);
      const review = result.rows[0];
      if (!review) {
        return res.status(404).json({ message: "review not found" });
      }
      return res.status(200).json(review);
    } else {
      const result = await db.query("SELECT * FROM reviews");
      const reviews = result.rows;
      if (reviews.length === 0) {
        return next(errorHandler(404, "reviews not found"));
      }
      res.status(200).json({
        message: "reviews retrieved successfully!",
        reviews,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to delete this Review")
    );
  }
  try {
    const { rows } = await db.query("SELECT * FROM reviews WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return next(errorHandler(404, "Review not found"));
    }
    await db.query("DELETE FROM reviews WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to Update this Review")
    );
  }
  try {
    const { name, review, rating } = req.body;
    const { reviewId } = req.params;

    // Prepare fields to update
    const fieldsToUpdate = [];
    const values = [];

    if (name) {
      fieldsToUpdate.push("name");
      values.push(name);
    }

    if (review) {
      fieldsToUpdate.push("review");
      values.push(review);
    }
    if (rating) {
      fieldsToUpdate.push("rating");
      values.push(rating);
    }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "reviews" },
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

    // Check if there are fields to update
    if (fieldsToUpdate.length === 0) {
      return next(errorHandler(400, "No fields to update"));
    }

    // Add blogId as the last parameter for the WHERE clause
    values.push(reviewId);

    // Dynamically construct the SET clause
    const setClause = fieldsToUpdate
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    // Execute the update query
    const updateQuery = `
          UPDATE reviews 
          SET ${setClause} 
          WHERE id = $${values.length} 
          RETURNING id, name, review, rating,image
        `;

    const updatedReview = await db.query(updateQuery, values);

    if (updatedReview.rowCount === 0) {
      return next(errorHandler(404, "review not found"));
    }

    res.status(200).json({
      message: "Team updated successfully",
      updatedReview: updatedReview.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

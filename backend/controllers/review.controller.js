import multer from "multer";
import { errorHandler } from "../utils/error.js";
import cloudinary from "../helper/cloudniaryConfig.js";
import ReviewModel from "../models/review.model.js";

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

export const addReview = async (req, res, next) => {
  // console.log(req.file)
  // console.log(req.body);
  // Extract data from the request body
  const { name, review, rating } = req.body;

  // Validate required fields
  if (!name || !review || !rating) {
    return next(errorHandler(400, "All fields are required"));
  }

  // Check if an image file was uploaded
  if (!req.file) {
    return next(errorHandler(400, "Image file is required"));
  }

  // Upload image to Cloudinary directly from memory
  try {
    const uploadResult = await cloudinary.v2.uploader.upload_stream(
      { folder: "review" },
      (error, result) => {
        if (error) {
          return next(
            errorHandler(500, "Failed to upload image to Cloudinary")
          );
        }

        // Create new team document with Cloudinary image URL
        const addTeam = new ReviewModel({
          name,
          review,
          image: result.secure_url,
          rating,
          createdAt: new Date(),
        });

        // Save the team document to the database
        addTeam
          .save()
          .then(() => {
            res.status(201).json({
              message: "Review added successfully",
              addTeam,
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

export const getReview = async (req, res, next) => {
  try {
    if (req.params.id) {
      const faq = await ReviewModel.findById(req.params.id);
      if (!faq) {
        return res.status(404).json({ message: "FAQ not found" });
      }
      return res.status(200).json(faq);
    } else {
      const review = await ReviewModel.find();
      if (review.length === 0) {
        return res.status(404).json({
          message: "Review not found",
        });
      }

      res.status(200).json({
        message: "Review retrieved successfully",
        review,
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
  const Review = await ReviewModel.findById(req.params.id);
  if (!Review) {
    return next(errorHandler(404, "Review not found"));
  }
  try {
    await ReviewModel.findByIdAndDelete(req.params.id);
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

    const updateReview = await ReviewModel.findByIdAndUpdate(
      req.params.reviewId,
      {
        $set: {
          name: req.body.name,
          review: req.body.answer,
          image: imageUrl,
          rating: req.body.rating,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Review updated successfully",
      updateReview,
    });
  } catch (error) {
    next(error);
  }
};

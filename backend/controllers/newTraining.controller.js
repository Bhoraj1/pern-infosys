import multer from "multer";
import { errorHandler } from "../utils/error.js";
import cloudinary from "../helper/cloudniaryConfig.js";
import { db } from "../config/db.connect.js";

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

export const AddTraining = async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  const {
    title,
    description,
    course_duration,
    time_slot,
    total_amount,
    instructor_name,
    instructor_bio,
    syllabus,
  } = req.body;
  if (
    !title ||
    !description ||
    !course_duration ||
    !time_slot ||
    !total_amount ||
    !instructor_name ||
    !instructor_bio ||
    !syllabus
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    cloudinary.v2.uploader
      .upload_stream({ folder: "trainings" }, async (error, result) => {
        if (error) {
          return next(
            errorHandler(500, "Failed to upload image to Cloudinary")
          );
        }
        const query = `
        INSERT INTO trainings (title,description,course_duration,time_slot,  total_amount, instructor_name,instructor_bio,syllabus,image)
        VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9)
        RETURNING *;
      `;
        const values = [
          title,
          description,
          course_duration,
          time_slot,
          total_amount,
          instructor_name,
          instructor_bio,
          syllabus,
          result.secure_url,
        ];

        try {
          const { rows } = await db.query(query, values);
          res.status(201).json({
            message: "training added successfully",
            training: rows[0],
          });
        } catch (dbError) {
          return next(errorHandler(500, "Error saving training to database"));
        }
      })
      .end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

export const getTrainings = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await db.query("SELECT * FROM trainings WHERE id = $1", [
        req.params.id,
      ]);
      const training = result.rows[0];
      if (!training) {
        return res.status(404).json({ message: "training not found" });
      }
      return res.status(200).json(team);
    } else {
      const result = await db.query("SELECT * FROM trainings");
      const trainings = result.rows;
      if (trainings.length === 0) {
        return next(errorHandler(404, "trainings not found"));
      }
      res.status(200).json({
        message: "trainings retrieved successfully!",
        trainings,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTraining = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to delete this training")
    );
  }
  const training = await TrainingModel.findById(req.params.id);
  if (!training) {
    return next(errorHandler(404, "Training not found"));
  }
  try {
    await TrainingModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Training deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateTraining = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to update this training")
    );
  }
  try {
    const updatedTraining = await TrainingModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          courseDuration: req.body.courseDuration,
          totalAmount: req.body.totalAmount,
          instructorName: req.body.instructorName,
          instructorBio: req.body.instructorBio,
          syllabus: req.body.syllabus,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );
    // console.log(updatedTraining);
    res
      .status(200)
      .json({ message: "Training updated successfully", updatedTraining });
  } catch (error) {
    next(error);
  }
};

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
        VALUES ($1, $2, $3,$4,$5,$6,$7,$8,$9)
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
      return res.status(200).json(training);
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
  try {
    const { rows } = await db.query("SELECT * FROM trainings WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return next(errorHandler(404, "Training not found"));
    }
    await db.query("DELETE FROM trainings WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "training deleted successfully" });
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
    const {
      title,
      description,
      course_duration,
      time_slot,
      instructor_name,
      instructor_bio,
      syllabus,
    } = req.body;
    const { trainingId } = req.params;

    const fieldsToUpdate = [];
    const values = [];

    if (title) {
      fieldsToUpdate.push("title");
      values.push(title);
    }

    if (description) {
      fieldsToUpdate.push("description");
      values.push(description);
    }
    if (course_duration) {
      fieldsToUpdate.push("course_duration");
      values.push(course_duration);
    }
    if (time_slot) {
      fieldsToUpdate.push("time_slot");
      values.push(time_slot);
    }
    if (instructor_name) {
      fieldsToUpdate.push("instructor_name");
      values.push(instructor_name);
    }
    if (instructor_bio) {
      fieldsToUpdate.push("instructor_bio");
      values.push(instructor_bio);
    }
    if (syllabus) {
      fieldsToUpdate.push("syllabus");
      values.push(syllabus);
    }

    // Handle image upload if a new file is provided
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "trainings" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(req.file.buffer);
      });

      fieldsToUpdate.push("image");
      values.push(result.secure_url);
    }

    if (fieldsToUpdate.length === 0) {
      return next(errorHandler(400, "No fields to update"));
    }

    values.push(trainingId);

    const setClause = fieldsToUpdate
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");
    const updateQuery = `
          UPDATE trainings 
          SET ${setClause} 
          WHERE id = $${values.length} 
          RETURNING id, title, description, course_duration, time_slot,instructor_name,instructor_bio,syllabus,image
        `;

    const updatedTraining = await db.query(updateQuery, values);

    if (updatedTraining.rowCount === 0) {
      return next(errorHandler(404, "Training not found"));
    }

    res.status(200).json({
      message: "Training updated successfully",
      updatedTraining: updatedTraining.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

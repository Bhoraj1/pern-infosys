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

export const AddTraining = async (req, res, next) => {
  // console.log(req.files);
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
    const uploadPromises = Object.values(req.files)
      .flat()
      .map((file) => {
        return new Promise((resolve, reject) => {
          cloudinary.v2.uploader
            .upload_stream({ folder: "trainings" }, (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            })
            .end(file.buffer);
        });
      });
    const imageUrls = await Promise.all(uploadPromises);

    const query = `
      INSERT INTO trainings (
        title, description, course_duration, time_slot, total_amount, 
        instructor_name, instructor_bio, syllabus, course_image, instructor_image
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
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
      imageUrls[0],
      imageUrls[1],
    ];

    const { rows } = await db.query(query, values);

    res.status(201).json({
      message: "Training added successfully",
      training: rows[0],
    });
  } catch (error) {
    // console.log(error);
    return next(errorHandler(500, "Error saving training to database"));
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

    if (req.files?.course_image) {
      const courseImageUpload = new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "trainings" }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          })
          .end(req.files.course_image[0].buffer);
      });

      const courseImageUrl = await courseImageUpload;
      fieldsToUpdate.push("course_image");
      values.push(courseImageUrl);
    }

    if (req.files?.instructor_image) {
      const instructorImageUpload = new Promise((resolve, reject) => {
        cloudinary.v2.uploader
          .upload_stream({ folder: "trainings" }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          })
          .end(req.files.instructor_image[0].buffer);
      });

      const instructorImageUrl = await instructorImageUpload;
      fieldsToUpdate.push("instructor_image");
      values.push(instructorImageUrl);
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
      RETURNING *;
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

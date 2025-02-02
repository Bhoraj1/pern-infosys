import multer from "multer";
import TrainingModel from "../models/newTraining.model.js";
import { errorHandler } from "../utils/error.js";
import cloudinary from "../helper/cloudniaryConfig.js";

//image storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/training");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//image filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

//image upload
export const upload = multer({
  storage: imgconfig,
  fileFilter: fileFilter,
});

export const AddTraining = async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  const {
    title,
    description,
    courseDuration,
    timeSlot,
    totalAmount,
    instructorName,
    instructorBio,
    syllabus,
  } = req.body;
  if (
    !title ||
    !description ||
    !courseDuration ||
    !timeSlot ||
    !totalAmount ||
    !instructorName ||
    !instructorBio ||
    !syllabus
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  const upload = await cloudinary.v2.uploader.upload(req.file.path, {
    folder: "trainings",
    use_filename: true,
  });
  const newTraining = new TrainingModel({
    title,
    image: upload.secure_url,
    description,
    courseDuration,
    timeSlot,
    totalAmount,
    instructorName,
    instructorBio,
    syllabus,
    createdAt: new Date(),
  });
  try {
    await newTraining.save();
    res.status(201).json({
      message: "Training added successfully",
      newTraining,
    });
  } catch (error) {
    next(error);
  }
};

export const getTrainings = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 8;
    const trainings = await TrainingModel.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);
    res.status(200).json({ trainings });
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

export const getTrainingById = async (req, res, next) => {
  // console.log("Received valid id:", req.params.id);
  try {
    const training = await TrainingModel.findById(req.params.id);

    if (!training) {
      return next(errorHandler(404, "Training not found"));
    }
    res.status(200).json({ training });
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

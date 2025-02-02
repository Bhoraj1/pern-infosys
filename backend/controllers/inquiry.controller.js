import Inquiry from "../models/inquiry.model.js";
import TrainingModel from "../models/newTraining.model.js";
import ServiceModel from "../models/services.model.js";
import { errorHandler } from "../utils/error.js";

export const createInquiry = async (req, res, next) => {
  const { name, email, number, services, message } = req.body;

  // console.log("Inquiry request received:", req.body);

  if (!name || !email || !number || !services || !message) {
    return next(errorHandler(400, "All fields are required"));
  }
  const inquiryUser = new Inquiry({
    name,
    email,
    number,
    services,
    message,
  });

  try {
    await inquiryUser.save();
    res.status(201).json("Success");
  } catch (error) {
    console.error("Error saving inquiry:", error);
    next(error);
  }
};

export const getinquiry = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.body.sort === "asc" ? 1 : -1;

    const users = await Inquiry.find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalUsers = await Inquiry.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lstMonthUsers = await Inquiry.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ users, totalUsers, lstMonthUsers });
  } catch (error) {
    console.error("Error quickey inquiry:", error);
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this inquiry")
    );
  }
  try {
    const deletedAdmission = await Inquiry.findByIdAndDelete(req.params.id);

    if (!deletedAdmission) {
      return next(errorHandler(404, "Admission not found"));
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getTrainingsAndServices = async (req, res, next) => {
  try {
    const [courses, services] = await Promise.all([
      TrainingModel.find({}, "title"), 
      ServiceModel.find({}, "title"),
    ]);

    if (!courses.length && !services.length) {
      return res.status(404).json({ message: "No courses or services found." });
    }

    // Send a combined response
    res.status(200).json({
      courses,
      services,
    });
  } catch (error) {
    next(error);
  }
};

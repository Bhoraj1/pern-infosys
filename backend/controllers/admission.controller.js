import admissionModel from "../models/admission.model.js";
import { errorHandler } from "../utils/error.js";

export const admission = async (req, res, next) => {
  const {
    name,
    parentName,
    email,
    number,
    address,
    courseName,
    courseDuration,
    timeSlot,
    totalAmount,
    amountPaid,
    paymentMethod,
  } = req.body;

  // console.log("Admission request received:", req.body);
  //avoiding the courseName from here because backend always check id of the field from frontend but we are sending the courseName dynamically from frontend
  if (!name || !parentName || !email || !number || !address) {
    return next(errorHandler(400, "All fields are required"));
  }
  const admissionUser = new admissionModel({
    name,
    parentName,
    email,
    number,
    address,
    courseName,
    courseDuration,
    timeSlot,
    totalAmount,
    amountPaid,
    paymentMethod,
  });

  try {
    await admissionUser.save();
    res.status(201).json({
      message: "Admission successful",
      admissionUser,
    });
    // console.log(admissionUser);
  } catch (error) {
    next(error);
  }
};

export const getAdmissions = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.body.sort === "asc" ? 1 : -1;

    const admissions = await admissionModel
      .find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalAdmissions = await admissionModel.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lstMonthAdmissions = await admissionModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ admissions, totalAdmissions, lstMonthAdmissions });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmission = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this inquiry")
    );
  }
  try {
    const deletedAdmission = await admissionModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletedAdmission) {
      return next(errorHandler(404, "Admission not found"));
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

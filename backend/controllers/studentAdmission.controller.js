import studentModel from "../models/studentAdmission.js";
import { errorHandler } from "../utils/error.js";

export const StudentAdmission = async (req, res, next) => {
  // console.log(" admission request received:", req.body);
  const { formData, billing } = req.body;
  const {
    name,
    dob,
    contactNumber,
    email,
    address,
    timeSlot,
    courseType,
    courseDuration,
    educationBackground,
    parentName,
    parentNumber,
    parentRelationship,
    totalAmount,
  } = formData;

  const userAdmission = new studentModel({
    name,
    dob,
    contactNumber,
    email,
    address,
    timeSlot,
    courseType,
    courseDuration,
    educationBackground,
    parentName,
    parentNumber,
    parentRelationship,
    totalAmount,
    billing: {
      studentName: billing.studentName,
      studentNumber: billing.studentNumber,
      paymentMethod: billing.paymentMethod,
      amountPaid: billing.amountPaid,
      remainingAmount: billing.remainingAmount,
      billingDate: billing.billingDate,
    },
  });

  try {
    await userAdmission.save();
    return res.status(201).json({
      message: "Form submitted successfully!",
      userAdmission,
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentAdmission = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.body.sort === "asc" ? 1 : -1;

    const admissions = await studentModel
      .find()
      .sort({ createdAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalAdmissions = await studentModel.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lstMonthAdmissions = await studentModel.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ admissions, totalAdmissions, lstMonthAdmissions });
  } catch (error) {
    next(error);
  }
};

export const getStudentAdmissionById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const admission = await studentModel.findById(id);
    if (!admission) {
      return next(errorHandler(404, "Admission not found"));
    }
    res.status(200).json(admission);
  } catch (error) {
    next(error);
  }
};

export const deleteStudentAdmission = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this inquiry")
    );
  }
  try {
    const deleteStudentAdmission = await studentModel.findByIdAndDelete(
      req.params.id
    );
    if (!deleteStudentAdmission) {
      return next(errorHandler(404, "Admission not found"));
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateStudentAdmission = async (req, res, next) => {
  // const { id } = req.params;
  // console.log(id);

  if (!req.user.isAdmin) {
    return next(
      errorHandler(
        403,
        "You are not allowed to update this Student's admission"
      )
    );
  }
  try {
    const updatedStudentAdmission = await studentModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          dob: req.body.dob,
          contactNumber: req.body.contactNumber,
          email: req.body.email,
          address: req.body.address,
          timeSlot: req.body.timeSlot,
          courseType: req.body.courseType,
          courseDuration: req.body.courseDuration,
          educationBackground: req.body.educationBackground,
          parentName: req.body.parentName,
          parentNumber: req.body.parentNumber,
          parentRelationship: req.body.parentRelationship,
          totalAmount: req.body.totalAmount,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );
    // console.log("Update Student Admission Request Data:", req.body);
    res.status(200).json({
      message: "StudentAdmission updated successfully",
      updatedStudentAdmission,
    });
  } catch (error) {
    next(error);
  }
};

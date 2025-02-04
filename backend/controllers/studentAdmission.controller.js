import { errorHandler } from "../utils/error.js";
import { db } from "../config/db.connect.js";

export const StudentAdmission = async (req, res, next) => {
  // console.log(req.body)
  const {
    student_name,
    student_number,
    contact_number,
    email,
    address,
    dob,
    course_duration,
    course_type,
    education_background,
    parent_name,
    parent_number,
    parent_relationship,
    time_slot,
    total_amount,
    payment_method,
    amount_paid,
    remaining_amount,
  } = req.body;
  try {
    const result = await db.query(
      `INSERT INTO student_admissions (
        student_name,
        student_number,
        contact_number,
        email,
        address,
        dob,
        course_duration,
        course_type,
        education_background,
        parent_name,
        parent_number,
        parent_relationship,
        time_slot,
        total_amount,
        payment_method,
        amount_paid,
        remaining_amount
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [
        student_name,
        student_number,
        contact_number,
        email,
        address,
        dob,
        course_duration,
        course_type,
        education_background,
        parent_name,
        parent_number,
        parent_relationship,
        time_slot,
        total_amount,
        payment_method,
        amount_paid,
        remaining_amount,
      ]
    );
    res.status(201).json({
      message: "Student Admission created successfully",
      data: result.rows[0],
    });
  } catch (err) {
    next(err);
    console.error("Error creating admission billing:", err);
  }
};

export const getStudentAdmission = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await db.query(
        "SELECT * FROM student_admissions WHERE id = $1",
        [req.params.id]
      );
      const admission = result.rows[0];
      if (!admission) {
        return res.status(404).json({ message: "admission not found" });
      }
      return res.status(200).json(admission);
    } else {
      const result = await db.query("SELECT * FROM student_admissions");
      const admissions = result.rows;
      if (admissions.length === 0) {
        return next(errorHandler(404, "admissions not found"));
      }
      res.status(200).json({
        message: "admissions retrieved successfully!",
        admissions,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteStudentAdmission = async (req, res, next) => {
  const { id } = req.params;
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this inquiry")
    );
  }
  try {
    const { rows } = await db.query(
      "SELECT * FROM student_admissions WHERE id = $1",
      [id]
    );
    if (rows.length === 0) {
      return next(errorHandler(404, "admissions not found"));
    }
    await db.query("DELETE FROM student_admissions WHERE id = $1", [id]);
    res.status(200).json({ message: "Admission deleted successfully" });
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

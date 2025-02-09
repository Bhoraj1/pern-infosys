import { errorHandler } from "../utils/error.js";
import { db } from "../config/db.connect.js";

export const StudentAdmission = async (req, res, next) => {
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
  if (!req.user.isAdmin) {
    return next(
      errorHandler(
        403,
        "You are not allowed to update this Student's admission"
      )
    );
  }
  try {
    const {
      student_name,
      contact_number,
      email,
      address,
      dob,
      education_background,
      parent_name,
      parent_number,
      parent_relationship,
    } = req.body;
    const { studentId } = req.params;

    const fieldsToUpdate = [];
    const values = [];

    if (student_name) {
      fieldsToUpdate.push("student_name");
      values.push(student_name);
    }

    if (contact_number) {
      fieldsToUpdate.push("contact_number");
      values.push(contact_number);
    }
    if (email) {
      fieldsToUpdate.push("email");
      values.push(email);
    }
    if (address) {
      fieldsToUpdate.push("address");
      values.push(address);
    }
    if (dob) {
      fieldsToUpdate.push("dob");
      values.push(dob);
    }

    if (education_background) {
      fieldsToUpdate.push("education_background");
      values.push(education_background);
    }

    if (parent_name) {
      fieldsToUpdate.push("parent_name");
      values.push(parent_name);
    }
    if (parent_number) {
      fieldsToUpdate.push("parent_number");
      values.push(parent_number);
    }

    if (parent_relationship) {
      fieldsToUpdate.push("parent_relationship");
      values.push(parent_relationship);
    }

    if (fieldsToUpdate.length === 0) {
      return next(errorHandler(400, "No fields to update"));
    }

    values.push(studentId);

    const setClause = fieldsToUpdate
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const updateQuery = `
        UPDATE student_admissions 
        SET ${setClause} 
        WHERE id = $${values.length} 
        RETURNING id, student_name, student_number, email, address,dob,education_background,parent_name,parent_name,parent_relationship
      `;

    const updatedStudent = await db.query(updateQuery, values);

    if (updatedStudent.rowCount === 0) {
      return next(errorHandler(404, "Student not found"));
    }

    res.status(200).json({
      message: "Student updated successfully",
      updatedStudent: updatedStudent.rows[0],
    });
  } catch (error) {
    next(error);
  }
};
export const update_bill = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const {
      student_name,
      student_number,
      email,
      course_duration,
      payment_method,
      amount_paid,
    } = req.body;

    const fieldsToUpdate = [];
    const values = [];

    if (student_name) {
      fieldsToUpdate.push("student_name");
      values.push(student_name);
    }
    if (student_number) {
      fieldsToUpdate.push("student_number");
      values.push(student_number);
    }
    if (email) {
      fieldsToUpdate.push("email");
      values.push(email);
    }
    if (course_duration) {
      fieldsToUpdate.push("course_duration");
      values.push(course_duration);
    }
    if (payment_method) {
      fieldsToUpdate.push("payment_method");
      values.push(payment_method);
    }

    const { rows } = await db.query(
      "SELECT amount_paid FROM student_admissions WHERE id = $1",
      [studentId]
    );
    const previousAmountPaid = rows[0].amount_paid;

    if (amount_paid !== undefined) {
      const newAmountPaid =
        parseFloat(previousAmountPaid) + parseFloat(amount_paid);

      if (isNaN(newAmountPaid)) {
        return res.status(400).json({ error: "Invalid amount_paid value" });
      }
      fieldsToUpdate.push("amount_paid");
      values.push(newAmountPaid);

      const { total_amount } = await db.query(
        "SELECT total_amount FROM student_admissions WHERE id = $1",
        [studentId]
      );
      const remainingAmount = total_amount - newAmountPaid;

      fieldsToUpdate.push("remaining_amount");
      values.push(remainingAmount);
    }

    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ error: "No fields provided for update" });
    }

    values.push(studentId);

    const setClause = fieldsToUpdate
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const updateQuery = `
      UPDATE student_admissions
      SET ${setClause}
      WHERE id = $${values.length}
      RETURNING *;
    `;

    const updatedStudent = await db.query(updateQuery, values);

    if (updatedStudent.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({
      message: "Student Bill updated successfully",
      student: updatedStudent.rows[0],
    });
  } catch (error) {
    next(errorHandler(error));
  }
};

import { db } from "../config/db.connect.js";
import { errorHandler } from "../utils/error.js";

export const admission = async (req, res, next) => {
  const { name, email, address, parent_name, number } = req.body;
  try {
    if (!name || !email || !address || !parent_name || !number) {
      return next(errorHandler(400, "All fields are required"));
    }
    await db.query(
      "INSERT INTO admissions (name, email,address, parent_name, number) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, email, address, parent_name, number]
    );
    res.status(201).send("Admission success!");
  } catch (error) {
    next(error);
  }
};

export const getAdmissions = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await db.query("SELECT * FROM admissions WHERE id = $1", [
        req.params.id,
      ]);
      const faq = result.rows[0];
      if (!faq) {
        return res.status(404).json({ message: "admission not found" });
      }
      return res.status(200).json(faq);
    } else {
      const result = await db.query("SELECT * FROM admissions");
      const admissions = result.rows;
      if (admissions.length === 0) {
        return next(errorHandler(404, "Admission not found"));
      }
      res.status(200).json({
        message: "Admission retrieved successfully!",
        admissions,
      });
    }
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

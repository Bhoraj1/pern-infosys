import { db } from "../config/db.connect.js";
import { errorHandler } from "../utils/error.js";

export const createInquiry = async (req, res, next) => {
  const { name, email, number, services, message } = req.body;

  try {
    if (!name || !email || !number || !message) {
      return next(errorHandler("All fields are required"));
    }

    await db.query(
      "INSERT INTO inquarys(name, email, number, services, message) VALUES($1, $2, $3, $4, $5) RETURNING *",
      [name, email, number, services, message]
    );

    res.status(201).send("Inquary Added Successfully!");
  } catch (error) {
    next(error);
  }
};

export const getinquiry = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await db.query("SELECT * FROM inquarys WHERE id = $1", [
        req.params.id,
      ]);
      const inquary = result.rows[0];
      if (!inquary) {
        return res.status(404).json({ message: "inquary not found" });
      }
      return res.status(200).json(inquary);
    } else {
      const result = await db.query("SELECT * FROM inquarys");
      const inquarys = result.rows;
      if (inquarys.length === 0) {
        return next(errorHandler(404, "inquarys not found"));
      }
      res.status(200).json({
        message: "inquarys retrieved successfully!",
        inquarys,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteInquiry = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not allowed to delete this inquiry")
    );
  }
  const { id } = req.params;
  try {
    const inquary = await db.query("SELECT * FROM inquarys WHERE id = $1", [
      id,
    ]);
    if (inquary.rows.length === 0) {
      return next(errorHandler(404, "inquary not found"));
    }

    await db.query("DELETE FROM inquarys WHERE id = $1", [id]);
    res.status(200).json({ message: "inquarys deleted successfully" });
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

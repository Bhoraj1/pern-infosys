import { errorHandler } from "../utils/error.js";
import multer from "multer";
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

export const services = async (req, res, next) => {

  const { title, description } = req.body;

  if (!title || !description) {
    return next(errorHandler(400, "All fields are required"));
  }

  if (!req.file) {
    return next(errorHandler(400, "Image file is required"));
  }
  try {
    cloudinary.v2.uploader
      .upload_stream({ folder: "services" }, async (error, image) => {
        if (error) {
          return next(
            errorHandler(500, "Failed to upload image to Cloudinary")
          );
        }
        const query = `
        INSERT INTO services (title,description, image )
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
        const values = [title, description, image.secure_url];
        try {
          const { rows } = await db.query(query, values);
          res.status(201).json({
            message: "Services successfully created",
            service: rows[0],
          });
        } catch (dbError) {
          return next(errorHandler(500, "Error saving service to database"));
        }
      })
      .end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

export const getServices = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await db.query("SELECT * FROM services WHERE id = $1", [
        req.params.id,
      ]);
      const service = result.rows[0];
      if (!service) {
        return res.status(404).json({ message: "service not found" });
      }
      return res.status(200).json(service);
    } else {
      const result = await db.query("SELECT * FROM services");
      const services = result.rows;
      if (services.length === 0) {
        return next(errorHandler(404, "services not found"));
      }
      res.status(200).json({
        message: "service retrieved successfully!",
        services,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query("SELECT * FROM services WHERE id = $1", [
      id,
    ]);

    if (rows.length === 0) {
      return next(errorHandler(404, "Service not found"));
    }

    await db.query("DELETE FROM services WHERE id = $1", [id]);

    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateService = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to update this service")
    );
  }

  try {
    const { title, description } = req.body;
    const { serviceId } = req.params;

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


    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "services" },
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

    values.push(serviceId);

    const setClause = fieldsToUpdate
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");
    const updateQuery = `
      UPDATE services 
      SET ${setClause}
      WHERE id = $${values.length} 
      RETURNING id, title, image, description
    `;

    const updatedService = await db.query(updateQuery, values);

    if (updatedService.rowCount === 0) {
      return next(errorHandler(404, "Service not found"));
    }

    res.status(200).json({
      message: "Service updated successfully",
      updatedService: updatedService.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

import multer from "multer";
import { errorHandler } from "../utils/error.js";
import cloudinary from "../helper/cloudniaryConfig.js";
import { db } from "../config/db.connect.js";

// Use memory storage instead of disk storage
const storage = multer.memoryStorage();

// Image filter (check if file is an image)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

// Initialize multer with memory storage
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export const addTeam = async (req, res, next) => {
  // console.log(req.body);
  // Extract data from the request body
  const {
    name,
    email,
    phonenumber,
    department,
    bio,
    description,
    socialmedia,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !email ||
    !phonenumber ||
    !department ||
    !bio ||
    !description ||
    !socialmedia
  ) {
    return next(errorHandler(400, "All fields are required"));
  }

  // Check if an image file was uploaded
  if (!req.file) {
    return next(errorHandler(400, "Image file is required"));
  }

  let parsedSocialMedia;
  try {
    parsedSocialMedia = JSON.parse(socialmedia);
  } catch (error) {
    return next(errorHandler(400, "Invalid social media format"));
  }

  try {
    cloudinary.v2.uploader
      .upload_stream({ folder: "teams" }, async (error, result) => {
        if (error) {
          return next(
            errorHandler(500, "Failed to upload image to Cloudinary")
          );
        }

        // Insert the blog post data into the database
        const query = `
        INSERT INTO teams (name, email, phonenumber, department,bio,description,socialmedia,image)
        VALUES ($1, $2, $3, $4,$5,$6,$7,$8)
        RETURNING *;
      `;
        const values = [
          name,
          email,
          phonenumber,
          department,
          bio,
          description,
          JSON.stringify(parsedSocialMedia),
          result.secure_url,
        ];

        try {
          const { rows } = await db.query(query, values);
          res.status(201).json({
            message: "Team added successfully",
            team: rows[0],
          });
        } catch (dbError) {
          // console.error("Database Error:", dbError);
          return next(errorHandler(500, "Error saving Team to database"));
        }
      })
      .end(req.file.buffer);
  } catch (error) {
    next(error);
  }
};

export const getTeams = async (req, res, next) => {
  try {
    if (req.params.id) {
      const result = await db.query("SELECT * FROM teams WHERE id = $1", [
        req.params.id,
      ]);
      const team = result.rows[0];
      if (!team) {
        return res.status(404).json({ message: "team not found" });
      }
      return res.status(200).json(team);
    } else {
      const result = await db.query("SELECT * FROM teams");
      const teams = result.rows;
      if (teams.length === 0) {
        return next(errorHandler(404, "teams not found"));
      }
      res.status(200).json({
        message: "Team retrieved successfully!",
        teams,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to delete this TeamMember")
    );
  }
  try {
    const { rows } = await db.query("SELECT * FROM teams WHERE id = $1", [
      req.params.id,
    ]);
    if (rows.length === 0) {
      return next(errorHandler(404, "team not found"));
    }
    await db.query("DELETE FROM teams WHERE id = $1", [req.params.id]);

    res.status(200).json({ message: "team deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to Update this Team Member")
    );
  }
  try {
    const {
      name,
      email,
      phonenumber,
      department,
      bio,
      description,
      socialmedia,
    } = req.body;
    const { teamId } = req.params;

    const fieldsToUpdate = [];
    const values = [];

    if (name) {
      fieldsToUpdate.push("name");
      values.push(name);
    }

    if (email) {
      fieldsToUpdate.push("email");
      values.push(email);
    }
    if (phonenumber) {
      fieldsToUpdate.push("phonenumber");
      values.push(phonenumber);
    }
    if (department) {
      fieldsToUpdate.push("department");
      values.push(department);
    }
    if (bio) {
      fieldsToUpdate.push("bio");
      values.push(bio);
    }

    if (description) {
      fieldsToUpdate.push("description");
      values.push(description);
    }
    if (socialmedia) {
      try {
        const parsedSocialMedia = JSON.parse(socialmedia);
        fieldsToUpdate.push("socialmedia");
        values.push(JSON.stringify(parsedSocialMedia));
      } catch (error) {
        return next(errorHandler(400, "Invalid JSON in socialMedia field"));
      }
    }

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.v2.uploader.upload_stream(
          { folder: "teams" },
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

    values.push(teamId);

    const setClause = fieldsToUpdate
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ");

    const updateQuery = `
        UPDATE teams 
        SET ${setClause} 
        WHERE id = $${values.length} 
        RETURNING id, name, email, phonenumber, department,bio,description,socialmedia,image
      `;

    const updatedTeam = await db.query(updateQuery, values);

    if (updatedTeam.rowCount === 0) {
      return next(errorHandler(404, "Blog not found"));
    }

    res.status(200).json({
      message: "Team updated successfully",
      updatedTeam: updatedTeam.rows[0],
    });
  } catch (error) {
    next(error);
  }
};

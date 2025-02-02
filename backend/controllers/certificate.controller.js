import Certificate from "../models/certificate.model.js";
import { errorHandler } from "../utils/error.js";

export const addCertificate = async (req, res, next) => {
  if (req.user.username !== "admin") {
    return next(errorHandler(403, "You are not allowed to add a certificate"));
  }
  const { name, certificateNumber, issueDate, course, courseTime } = req.body;

  // console.log("Inquiry request received:", req.body);

  if (!name || !certificateNumber || !issueDate || !course || !courseTime) {
    return next(errorHandler(400, "All fields are required"));
  }
  const certificateDetails = new Certificate({
    name,
    certificateNumber,
    issueDate,
    course,
    courseTime,
  });

  try {
    await certificateDetails.save();
    res.status(201).json({
      message: "Certificate added successfully",
      certificateDetails,
    });
  } catch (error) {
    console.error("Error saving inquiry:", error);
    next(error);
  }
};

export const getCertificateByNumber = async (req, res, next) => {
  const { certificateNumber } = req.params;

  if (!certificateNumber) {
    return next(errorHandler(400, "Certificate number is required"));
  }

  try {
    const certificate = await Certificate.findOne({ certificateNumber });

    if (!certificate) {
      return next(
        errorHandler(
          404,
          "Certificate not found in this number please enter a valid certificate number"
        )
      );
    }

    res.status(200).json({ certificate });
  } catch (error) {
    console.error("Error retrieving certificate:", error);
    next(error);
  }
};

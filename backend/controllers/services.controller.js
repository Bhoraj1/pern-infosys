import ServiceModel from "../models/services.model.js";
import { errorHandler } from "../utils/error.js";
import multer from "multer";
import cloudinary from "../helper/cloudniaryConfig.js";

//image storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/service");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//image filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

//image upload
export const upload = multer({
  storage: imgconfig,
  fileFilter: fileFilter,
});

export const services = async (req, res, next) => {
  // console.log(req.file);
  // console.log(req.body);
  const { title, description } = req.body;
  try {
    if (!title || !description) {
      return next(errorHandler(400, "Title and description are required"));
    }

    const upload = await cloudinary.v2.uploader.upload(req.file.path, {
      folder: "services",
      use_filename: true,
    });
    const service = new ServiceModel({
      title,
      description,
      imagePath: upload.secure_url,
    });
    await service.save();
    res.json({
      message: "Service added successfully",
      service,
    });
  } catch (error) {
    next(error);
  }
};

export const getServices = async (req, res, next) => {
  try {
    const services = await ServiceModel.find();
    res.json({
      message: "Services retrieved successfully",
      services,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteService = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.isAdmin) {
    return next(
      errorHandler(403, "You are not authorized to delete this service")
    );
  }
  const service = await ServiceModel.findById(req.params.id);
  if (!service) {
    return next(errorHandler(404, "Service not found"));
  }
  try {
    await ServiceModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const serviceById = async (req, res, next) => {
  // console.log("Received valid id:", req.params.id);
  try {
    const service = await ServiceModel.findById(req.params.id);

    if (!service) {
      return next(errorHandler(404, "service not found"));
    }
    res.status(200).json({ service });
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
    const updatedService = await ServiceModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
          updatedAt: new Date(),
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "Service updated successfully",
      updatedService,
    });
    // console.log(updatedService);
  } catch (error) {
    next(error);
  }
};

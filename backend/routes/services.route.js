import express from "express";
import {
  deleteService,
  getServices,
  serviceById,
  services,
  updateService,
  upload,
} from "../controllers/services.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/service", upload.single("photo"), verifyToken, services);
router.get("/get-services", getServices);
router.delete("/delete-service/:id", verifyToken, deleteService);
router.get("/get-service/:id", verifyToken, serviceById);
router.put("/update/:id", verifyToken, updateService);
export default router;

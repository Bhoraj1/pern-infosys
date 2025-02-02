import express from "express";
import {
  deleteService,
  getServices,
  services,
  updateService,
  upload,
} from "../controllers/services.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/service", upload.single("image"), verifyToken, services);
router.get("/get-services/:id?", getServices);
router.delete("/delete-service/:id", verifyToken, deleteService);
router.put(
  "/update/:serviceId",
  upload.single("image"),
  verifyToken,
  updateService
);
export default router;

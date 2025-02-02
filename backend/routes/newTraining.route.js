import express from "express";
import {
  AddTraining,
  deleteTraining,
  getTrainingById,
  getTrainings,
  updateTraining,
  upload,
} from "../controllers/newTraining.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/training", upload.single("image"), verifyToken, AddTraining);
router.get("/getTrainings", getTrainings);
router.get("/training/:id", getTrainingById);
router.delete("/deleteTraining/:id", verifyToken, deleteTraining);
router.put("/update/:id", verifyToken, updateTraining);

export default router;

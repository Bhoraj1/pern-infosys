import express from "express";
import {
  AddTraining,
  deleteTraining,
  getTrainings,
  updateTraining,
  upload,
} from "../controllers/newTraining.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post(
  "/training",
  verifyToken,
  upload.fields([
    { name: "course_image", maxCount: 1 },
    { name: "instructor_image", maxCount: 1 },
  ]),
  AddTraining
);
router.get("/getTrainings/:id?", getTrainings);
router.delete("/deleteTraining/:id", verifyToken, deleteTraining);
router.put(
  "/update/:trainingId",
  upload.fields([
    { name: "course_image", maxCount: 1 },
    { name: "instructor_image", maxCount: 1 },
  ]),
  verifyToken,
  updateTraining
);

export default router;

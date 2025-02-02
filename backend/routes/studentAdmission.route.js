import express from "express";
import {
  deleteStudentAdmission,
  getStudentAdmission,
  getStudentAdmissionById,
  StudentAdmission,
  updateStudentAdmission,
} from "../controllers/studentAdmission.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/student-admission", verifyToken, StudentAdmission);
router.get("/getStudentAdmission", verifyToken, getStudentAdmission);
router.get("/getStudentAdmission/:id", verifyToken, getStudentAdmissionById);
router.delete(
  "/deleteStudentAdmission/:id",
  verifyToken,
  deleteStudentAdmission
);
router.put("/update/:id", verifyToken, updateStudentAdmission);

export default router;

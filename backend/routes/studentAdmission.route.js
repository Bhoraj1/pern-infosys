import express from "express";
import {
  deleteStudentAdmission,
  getStudentAdmission,
  StudentAdmission,
  updateStudentAdmission,
} from "../controllers/studentAdmission.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.post("/student-admission", verifyToken, StudentAdmission);
router.get("/getStudentAdmission/:id?", verifyToken, getStudentAdmission);
router.delete(
  "/deleteStudentAdmission/:id",
  verifyToken,
  deleteStudentAdmission
);
router.put("/update/:studentId", verifyToken, updateStudentAdmission);

export default router;

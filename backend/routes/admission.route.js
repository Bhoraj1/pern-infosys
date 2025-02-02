import express from "express";
import {
  admission,
  deleteAdmission,
  getAdmissions,
} from "../controllers/admission.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/admission", admission);
router.get("/getadmissions", verifyToken, getAdmissions);
router.delete("/deleteadmission/:id", verifyToken, deleteAdmission);

export default router;

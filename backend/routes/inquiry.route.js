import express from "express";
import {
  createInquiry,
  deleteInquiry,
  getinquiry,
  getTrainingsAndServices,
} from "../controllers/inquiry.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/inquiry", createInquiry);
router.get("/getinquirys", verifyToken, getinquiry);
router.delete("/deleteInquiry/:id", verifyToken, deleteInquiry);
router.get("/title", getTrainingsAndServices);

export default router;

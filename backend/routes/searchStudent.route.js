import express from "express";

import { verifyToken } from "../utils/verifyUser.js";
import {
  searchStudent,
  updateBill,
} from "../controllers/searchStudent.controller.js";

const router = express.Router();
router.get("/search/:key", verifyToken, searchStudent);
router.put("/update-bill/:id", verifyToken, updateBill);

export default router;

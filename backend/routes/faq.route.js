import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addFaq,
  deleteFAQ,
  getFaqs,
  updateFAQ,
} from "../controllers/faq.controller.js";

const router = express.Router();

router.post("/add-faq", verifyToken, addFaq);
router.get("/get-faqs/:id?", getFaqs);
router.delete("/delete-faq/:id", verifyToken, deleteFAQ);
router.put("/update-faq/:faqId", verifyToken, updateFAQ);

export default router;

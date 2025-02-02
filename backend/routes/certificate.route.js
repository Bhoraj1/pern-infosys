import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addCertificate,
  getCertificateByNumber,
} from "../controllers/certificate.controller.js";

const router = express.Router();

router.post("/addCertificate", verifyToken, addCertificate);
router.get("/getCertificate/:certificateNumber", getCertificateByNumber);

export default router;

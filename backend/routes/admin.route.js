import express from "express";
import { login, signout, signup } from "../controllers/admin.controller.js";

const router = express.Router();
router.post("/admin-signup", signup);
router.post("/admin-login", login);
router.post("/signout", signout);

export default router;

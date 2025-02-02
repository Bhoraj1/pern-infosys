import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addTeam,
  deleteTeamMember,
  getTeams,
  updateTeamMember,
  upload,
} from "../controllers/team.controller.js";

const router = express.Router();

router.post("/add-team", upload.single("image"), verifyToken, addTeam);
router.get("/getTeams/:id?", getTeams);
router.delete("/delete-teamMember/:id", verifyToken, deleteTeamMember);
router.put(
  "/update-teamMember/:teamId",
  upload.single("image"),
  verifyToken,
  updateTeamMember
);

export default router;

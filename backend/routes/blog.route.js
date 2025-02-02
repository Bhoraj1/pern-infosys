import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  deleteBlog,
  getBlog,
  postBlog,
  updateBlogPost,
  upload,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/post-blog", upload.single("image"), verifyToken, postBlog);
router.get("/getBlogs/:id?", getBlog);
router.delete("/delete-blog/:id", verifyToken, deleteBlog);
router.put(
  "/update-blog/:blogId",
  upload.single("image"),
  verifyToken,
  updateBlogPost
);

export default router;

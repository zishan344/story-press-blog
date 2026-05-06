import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlogById,
  getBlogs,
} from "../controllers/blogController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", requireAuth, createBlog);
router.delete("/:id", requireAuth, deleteBlog);

export default router;

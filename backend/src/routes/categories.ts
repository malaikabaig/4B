import { Router } from "express"
import {
  getCategories,
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController"
import { protect } from "../middleware/auth"

const router = Router()

// Public
router.get("/", getCategories)

// Admin
router.get("/admin/all", protect, getAllCategories)
router.post("/", protect, createCategory)
router.put("/:id", protect, updateCategory)
router.delete("/:id", protect, deleteCategory)

export default router

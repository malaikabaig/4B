import { Router } from "express"
import {
  getProducts,
  getProduct,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController"
import { protect } from "../middleware/auth"

const router = Router()

// Public
router.get("/", getProducts)
router.get("/:id", getProduct)

// Admin
router.get("/admin/all", protect, getAllProducts)
router.post("/", protect, createProduct)
router.put("/:id", protect, updateProduct)
router.delete("/:id", protect, deleteProduct)

export default router

import { Router } from "express"
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
  getDashboard,
} from "../controllers/orderController"
import { protect } from "../middleware/auth"

const router = Router()

// Public
router.post("/", createOrder)

// Admin
router.get("/", protect, getOrders)
router.get("/dashboard", protect, getDashboard)
router.get("/:id", protect, getOrder)
router.patch("/:id/status", protect, updateOrderStatus)

export default router

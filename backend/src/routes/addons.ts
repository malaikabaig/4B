import { Router } from "express"
import {
  getAddons,
  getAllAddons,
  createAddon,
  updateAddon,
  deleteAddon,
} from "../controllers/addonController"
import { protect } from "../middleware/auth"

const router = Router()

// Public
router.get("/", getAddons)

// Admin
router.get("/admin/all", protect, getAllAddons)
router.post("/", protect, createAddon)
router.put("/:id", protect, updateAddon)
router.delete("/:id", protect, deleteAddon)

export default router

import { Request, Response } from "express"
import { Category } from "../models/Category"

// PUBLIC
export async function getCategories(req: Request, res: Response): Promise<void> {
  const categories = await Category.find({ isActive: true }).sort("order")
  res.json({ success: true, data: categories })
}

// ADMIN
export async function getAllCategories(req: Request, res: Response): Promise<void> {
  const categories = await Category.find().sort("order")
  res.json({ success: true, data: categories })
}

export async function createCategory(req: Request, res: Response): Promise<void> {
  const { name, slug, description, image, order } = req.body
  if (!name || !slug) {
    res.status(400).json({ success: false, message: "Name and slug are required" })
    return
  }
  const category = await Category.create({ name, slug, description, image, order })
  res.status(201).json({ success: true, data: category })
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!category) {
    res.status(404).json({ success: false, message: "Category not found" })
    return
  }
  res.json({ success: true, data: category })
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  const category = await Category.findByIdAndDelete(req.params.id)
  if (!category) {
    res.status(404).json({ success: false, message: "Category not found" })
    return
  }
  res.json({ success: true, message: "Category deleted" })
}

import { Request, Response } from "express"
import { Product } from "../models/Product"

// PUBLIC
export async function getProducts(req: Request, res: Response): Promise<void> {
  const filter: Record<string, unknown> = { isAvailable: true }
  if (req.query.category) filter.category = req.query.category

  const products = await Product.find(filter)
    .populate("category", "name slug")
    .populate("addons", "name price")
    .sort("order")

  res.json({ success: true, data: products })
}

export async function getProduct(req: Request, res: Response): Promise<void> {
  const product = await Product.findById(req.params.id)
    .populate("category", "name slug")
    .populate("addons", "name price")

  if (!product || !product.isAvailable) {
    res.status(404).json({ success: false, message: "Product not found" })
    return
  }
  res.json({ success: true, data: product })
}

// ADMIN
export async function getAllProducts(req: Request, res: Response): Promise<void> {
  const products = await Product.find()
    .populate("category", "name slug")
    .populate("addons", "name price")
    .sort("order")
  res.json({ success: true, data: products })
}

export async function createProduct(req: Request, res: Response): Promise<void> {
  const { name, description, price, category, addons, image, isFeatured, isPopular, order } = req.body
  if (!name || price === undefined || !category) {
    res.status(400).json({ success: false, message: "Name, price and category are required" })
    return
  }
  const product = await Product.create({ name, description, price, category, addons, image, isFeatured, isPopular, order })
  res.status(201).json({ success: true, data: product })
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" })
    return
  }
  res.json({ success: true, data: product })
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) {
    res.status(404).json({ success: false, message: "Product not found" })
    return
  }
  res.json({ success: true, message: "Product deleted" })
}

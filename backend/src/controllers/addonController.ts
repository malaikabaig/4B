import { Request, Response } from "express"
import { Addon } from "../models/Addon"

// PUBLIC
export async function getAddons(req: Request, res: Response): Promise<void> {
  const addons = await Addon.find({ isActive: true }).populate("applicableCategories", "name slug")
  res.json({ success: true, data: addons })
}

// ADMIN
export async function getAllAddons(req: Request, res: Response): Promise<void> {
  const addons = await Addon.find().populate("applicableCategories", "name slug")
  res.json({ success: true, data: addons })
}

export async function createAddon(req: Request, res: Response): Promise<void> {
  const { name, price, applicableCategories } = req.body
  if (!name || price === undefined) {
    res.status(400).json({ success: false, message: "Name and price are required" })
    return
  }
  const addon = await Addon.create({ name, price, applicableCategories })
  res.status(201).json({ success: true, data: addon })
}

export async function updateAddon(req: Request, res: Response): Promise<void> {
  const addon = await Addon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })
  if (!addon) {
    res.status(404).json({ success: false, message: "Addon not found" })
    return
  }
  res.json({ success: true, data: addon })
}

export async function deleteAddon(req: Request, res: Response): Promise<void> {
  const addon = await Addon.findByIdAndDelete(req.params.id)
  if (!addon) {
    res.status(404).json({ success: false, message: "Addon not found" })
    return
  }
  res.json({ success: true, message: "Addon deleted" })
}

import { Request, Response } from "express"
import { Order } from "../models/Order"
import { Product } from "../models/Product"
import { Addon } from "../models/Addon"

function generateOrderNumber(): string {
  const ts = Date.now().toString().slice(-6)
  const rand = Math.floor(Math.random() * 900 + 100)
  return `4B${ts}${rand}`
}

// PUBLIC — place order
export async function createOrder(req: Request, res: Response): Promise<void> {
  const {
    orderType,
    customerName,
    phone,
    address,
    landmark,
    pickupTime,
    specialInstructions,
    items, // [{ productId, quantity, selectedAddonIds: string[], specialInstructions }]
  } = req.body

  // Basic field validation
  if (!orderType || !customerName || !phone || !items || !Array.isArray(items) || items.length === 0) {
    res.status(400).json({ success: false, message: "Missing required order fields" })
    return
  }
  if (orderType === "delivery" && !address) {
    res.status(400).json({ success: false, message: "Delivery address is required" })
    return
  }
  if (orderType === "pickup" && !pickupTime) {
    res.status(400).json({ success: false, message: "Pick-up time is required" })
    return
  }

  // Server-side price calculation
  let subtotal = 0
  const resolvedItems = []

  for (const item of items) {
    const product = await Product.findById(item.productId)
    if (!product || !product.isAvailable) {
      res.status(400).json({ success: false, message: `Product not available: ${item.productId}` })
      return
    }

    const resolvedAddons = []
    let addonsTotal = 0

    for (const addonId of item.selectedAddonIds ?? []) {
      const addon = await Addon.findById(addonId)
      if (!addon || !addon.isActive) {
        res.status(400).json({ success: false, message: `Addon not available: ${addonId}` })
        return
      }
      addonsTotal += addon.price
      resolvedAddons.push({ addonId: addon._id, name: addon.name, price: addon.price })
    }

    const unitPrice = product.price
    const qty = Number(item.quantity) || 1
    const itemTotal = (unitPrice + addonsTotal) * qty
    subtotal += itemTotal

    resolvedItems.push({
      productId:           product._id,
      name:                product.name,
      unitPrice,
      quantity:            qty,
      selectedAddons:      resolvedAddons,
      specialInstructions: item.specialInstructions ?? "",
      itemTotal,
    })
  }

  const deliveryCharge = orderType === "delivery" ? 100 : 0
  const total = subtotal + deliveryCharge

  const order = await Order.create({
    orderNumber: generateOrderNumber(),
    orderType,
    customerName,
    phone,
    address:             address ?? "",
    landmark:            landmark ?? "",
    pickupTime:          pickupTime ?? "",
    specialInstructions: specialInstructions ?? "",
    items:               resolvedItems,
    subtotal,
    deliveryCharge,
    total,
    status: "pending",
  })

  res.status(201).json({
    success: true,
    data: {
      orderNumber:  order.orderNumber,
      total:        order.total,
      status:       order.status,
      _id:          order._id,
    },
  })
}

// ADMIN — list all orders
export async function getOrders(req: Request, res: Response): Promise<void> {
  const { status, page = "1", limit = "20" } = req.query
  const filter: Record<string, unknown> = {}
  if (status) filter.status = status

  const skip = (Number(page) - 1) * Number(limit)
  const [orders, total] = await Promise.all([
    Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
    Order.countDocuments(filter),
  ])

  res.json({ success: true, total, page: Number(page), data: orders })
}

// ADMIN — get single order
export async function getOrder(req: Request, res: Response): Promise<void> {
  const order = await Order.findById(req.params.id)
  if (!order) {
    res.status(404).json({ success: false, message: "Order not found" })
    return
  }
  res.json({ success: true, data: order })
}

// ADMIN — update order status
export async function updateOrderStatus(req: Request, res: Response): Promise<void> {
  const { status } = req.body
  const allowed = ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"]
  if (!allowed.includes(status)) {
    res.status(400).json({ success: false, message: "Invalid status value" })
    return
  }
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
  if (!order) {
    res.status(404).json({ success: false, message: "Order not found" })
    return
  }
  res.json({ success: true, data: order })
}

// ADMIN — dashboard counts
export async function getDashboard(req: Request, res: Response): Promise<void> {
  const [total, pending, confirmed, preparing, completed, cancelled] = await Promise.all([
    Order.countDocuments(),
    Order.countDocuments({ status: "pending" }),
    Order.countDocuments({ status: "confirmed" }),
    Order.countDocuments({ status: "preparing" }),
    Order.countDocuments({ status: "completed" }),
    Order.countDocuments({ status: "cancelled" }),
  ])

  const revenueAgg = await Order.aggregate([
    { $match: { status: { $in: ["confirmed", "preparing", "ready", "completed"] } } },
    { $group: { _id: null, total: { $sum: "$total" } } },
  ])
  const revenue = revenueAgg[0]?.total ?? 0

  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5)

  res.json({
    success: true,
    data: { total, pending, confirmed, preparing, completed, cancelled, revenue, recentOrders },
  })
}

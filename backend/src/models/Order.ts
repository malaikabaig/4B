import { Schema, model, Document, Types } from "mongoose"

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled"

export type OrderType = "delivery" | "pickup"

export interface IOrderAddon {
  addonId: Types.ObjectId
  name: string         // snapshot
  price: number        // snapshot
}

export interface IOrderItem {
  productId: Types.ObjectId
  name: string         // snapshot
  unitPrice: number    // snapshot
  quantity: number
  selectedAddons: IOrderAddon[]
  specialInstructions: string
  itemTotal: number
}

export interface IOrder extends Document {
  orderNumber: string
  orderType: OrderType
  customerName: string
  phone: string
  address?: string
  landmark?: string
  pickupTime?: string
  specialInstructions?: string
  items: IOrderItem[]
  subtotal: number
  deliveryCharge: number
  total: number
  status: OrderStatus
  createdAt: Date
  updatedAt: Date
}

const orderAddonSchema = new Schema<IOrderAddon>(
  {
    addonId: { type: Schema.Types.ObjectId, ref: "Addon", required: true },
    name:    { type: String, required: true },
    price:   { type: Number, required: true },
  },
  { _id: false }
)

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId:           { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name:                { type: String, required: true },
    unitPrice:           { type: Number, required: true },
    quantity:            { type: Number, required: true, min: 1 },
    selectedAddons:      [orderAddonSchema],
    specialInstructions: { type: String, default: "" },
    itemTotal:           { type: Number, required: true },
  },
  { _id: false }
)

const orderSchema = new Schema<IOrder>(
  {
    orderNumber:         { type: String, required: true, unique: true },
    orderType:           { type: String, enum: ["delivery", "pickup"], required: true },
    customerName:        { type: String, required: true, trim: true },
    phone:               { type: String, required: true, trim: true },
    address:             { type: String, default: "" },
    landmark:            { type: String, default: "" },
    pickupTime:          { type: String, default: "" },
    specialInstructions: { type: String, default: "" },
    items:               { type: [orderItemSchema], required: true },
    subtotal:            { type: Number, required: true },
    deliveryCharge:      { type: Number, default: 0 },
    total:               { type: Number, required: true },
    status:              {
      type: String,
      enum: ["pending", "confirmed", "preparing", "ready", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
)

export const Order = model<IOrder>("Order", orderSchema)

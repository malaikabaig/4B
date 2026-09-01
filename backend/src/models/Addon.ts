import { Schema, model, Document, Types } from "mongoose"

export interface IAddon extends Document {
  name: string
  price: number
  isActive: boolean
  applicableCategories: Types.ObjectId[] // empty = available for all
}

const addonSchema = new Schema<IAddon>(
  {
    name:                 { type: String, required: true, trim: true },
    price:                { type: Number, required: true, min: 0 },
    isActive:             { type: Boolean, default: true },
    applicableCategories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
)

export const Addon = model<IAddon>("Addon", addonSchema)

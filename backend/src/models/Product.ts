import { Schema, model, Document, Types } from "mongoose"

export interface IProduct extends Document {
  name: string
  description: string
  price: number
  category: Types.ObjectId
  addons: Types.ObjectId[]
  image: string
  isAvailable: boolean
  isFeatured: boolean
  isPopular: boolean
  order: number
}

const productSchema = new Schema<IProduct>(
  {
    name:        { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price:       { type: Number, required: true, min: 0 },
    category:    { type: Schema.Types.ObjectId, ref: "Category", required: true },
    addons:      [{ type: Schema.Types.ObjectId, ref: "Addon" }],
    image:       { type: String, default: "" },
    isAvailable: { type: Boolean, default: true },
    isFeatured:  { type: Boolean, default: false },
    isPopular:   { type: Boolean, default: false },
    order:       { type: Number, default: 0 },
  },
  { timestamps: true }
)

export const Product = model<IProduct>("Product", productSchema)

import { Schema, model, Document } from "mongoose"

export interface ICategory extends Document {
  name: string
  slug: string
  description?: string
  image?: string
  order: number
  isActive: boolean
}

const categorySchema = new Schema<ICategory>(
  {
    name:        { type: String, required: true, trim: true },
    slug:        { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: "" },
    image:       { type: String, default: "" },
    order:       { type: Number, default: 0 },
    isActive:    { type: Boolean, default: true },
  },
  { timestamps: true }
)

export const Category = model<ICategory>("Category", categorySchema)

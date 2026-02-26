import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  discountPrice: { type: Number, default: null },
  category: {
    type: String,
    required: [true, "Category is required"],
    uppercase: true, // Apnar UI-te T-SHIRTS, PANTS uppercase ache tai
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  stock: {
    type: Number,
    default: 0,
  },
  // Multiple images-er jonno string array
  images: {
    type: [String],
    required: [true, "At least one image is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Model caching logic jate Next.js hot reload-e error na dey
const Product = models.Product || model("Product", ProductSchema);

export default Product;

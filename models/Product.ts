import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  productId: { 
    type: String, 
    required: [true, "Product ID is required"],
    unique: true,
    trim: true
  },
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
    uppercase: true,
  },
  sizes: {
    type: [String],
    default: [],
  },
  material: {
    type: String,
    trim: true,
  },
  care: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
  stock: {
    type: Number,
    default: 0,
  },

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

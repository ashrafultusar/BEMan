import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }], // Array of image URLs
  createdAt: { type: Date, default: Date.now },
});

// Jodi model age theke thake shetai use korbe, na thakle notun banabe
const Product = models.Product || model("Product", ProductSchema);
export default Product;
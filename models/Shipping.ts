import mongoose from "mongoose";

const ShippingSchema = new mongoose.Schema({
  insideDhaka: { 
    type: Number, 
    required: true, 
    default: 70 
  },
  outsideDhaka: { 
    type: Number, 
    required: true, 
    default: 150 
  }
}, { timestamps: true });

export const Shipping = mongoose.models.Shipping || mongoose.model("Shipping", ShippingSchema);
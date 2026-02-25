import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    // এটি হবে আপনার ফিক্সড আইডি ফরম্যাট
    customOrderId: { 
      type: String, 
      unique: true,
      default: function() {
        // ৬ অক্ষরের একটি র্যান্ডম কোড জেনারেট করবে
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `BEMEN-#${randomCode}`; // BEMEN-#FIXED অংশ
      }
    },
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: { 
      type: String, 
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"], 
      default: "Pending" 
    },
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", OrderSchema);
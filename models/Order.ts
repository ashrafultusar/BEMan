import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    altPhoneNumber: { type: String },
    address: { type: String, required: true },
    city: { type: String, required: true },
    notes: { type: String },
    items: [
      {
        productId: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        size: { type: String, required: true },
        image: { type: String },
      },
    ],
    subtotal: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export const Order = models.Order || model("Order", OrderSchema);

"use server";

import { connectDB } from "@/db/dbConfig";
import { Order } from "@/models/Order";
import mongoose from "mongoose";

export async function getOrderById(id: string) {
  try {
    await connectDB();
    
    // orderId (BEMEN-XXXX) অথবা মঙ্গোডিবি ডিফল্ট _id যেকোনো একটি মিললেই ডাটা নিয়ে আসবে
    const order = await Order.findOne({
      $or: [
        { orderId: id }, 
        ...(mongoose.Types.ObjectId.isValid(id) ? [{ _id: id }] : [])
      ]
    }).lean();

    if (!order) {
      return { success: false, message: "Order not found" };
    }

    // মঙ্গোডিবি অবজেক্টকে প্লেইন জেসন (JSON) এ রূপান্তর
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(order)) 
    };
  } catch (error) {
    console.error("Fetch Order Error:", error);
    return { success: false, message: "Error fetching order" };
  }
}

export async function getAllOrders() {
    try {
      await connectDB();
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      return { 
        success: true, 
        data: JSON.parse(JSON.stringify(orders)) 
      };
    } catch (error) {
      return { success: false, data: [] };
    }
}
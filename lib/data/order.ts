"use server";

import { connectDB } from "@/db/dbConfig";
import { Order } from "@/models/Order";


export async function getAllOrders() {
    try {
      await connectDB()
      // সব অর্ডার নিয়ে আসবে, নতুন অর্ডার সবার উপরে দেখাবে
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      
      return { 
        success: true, 
        data: JSON.parse(JSON.stringify(orders)) 
      };
    } catch (error) {
      console.error("Fetch Orders Error:", error);
      return { success: false, data: [] };
    }
  }

export async function getOrderById(id: string) {
  try {
    await connectDB()
    const order = await Order.findById(id).lean(); 

    if (!order) {
      return { success: false, message: "Order not found" };
    }

    return { success: true, data: JSON.parse(JSON.stringify(order)) };
  } catch (error) {
    return { success: false, message: "Error fetching order" };
  }
}
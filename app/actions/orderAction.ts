"use server";


import { connectDB } from "@/db/dbConfig";
import { Order } from "@/models/Order";

// app/actions/orderAction.ts
export async function createOrder(orderData: any) {
  try {
    await connectDB();
    const newOrder = new Order(orderData);
    await newOrder.save(); // pre-save hook এখানে আইডি জেনারেট করবে
    
    return { 
      success: true, 
      orderId: newOrder._id.toString(), // URL-এর জন্য মঙ্গো আইডি
      customOrderId: newOrder.customOrderId // ইউজারকে দেখানোর জন্য BEMEN আইডি
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
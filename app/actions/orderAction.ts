"use server";

import { connectDB } from "@/db/dbConfig";
import { Order } from "@/models/Order";
import crypto from "crypto";

export async function createOrder(orderData: any) {
  try {
    await connectDB();
    
    // ইউনিক আইডি জেনারেট (BEMEN-XXXXXX)
    const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
    const customOrderId = `BEMEN-${randomPart}`;

    const finalOrderData = {
      ...orderData,
      orderId: customOrderId
    };
    
    const newOrder = await Order.create(finalOrderData);
    
    return { 
      success: true, 
      orderId: newOrder.orderId // এটি সাকসেস পেজের URL-এ যাবে
    };
  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return { 
      success: false, 
      message: error.message || "Failed to place order." 
    };
  }
}
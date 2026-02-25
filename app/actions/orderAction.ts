"use server";

import { connectDB } from "@/db/dbConfig";
import { Order } from "@/models/Order";
import crypto from "crypto";
import { revalidatePath } from "next/cache";

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

export async function updateOrderStatus(id: string, status: string) {
  try {
    await connectDB();
    
    const updatedOrder = await Order.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!updatedOrder) {
      return { success: false, message: "Order not found" };
    }

    // ডাটাবেস আপডেট হওয়ার পর ক্যাশ ক্লিয়ার করা
    revalidatePath("/bemen-staff-portal/orders");
    
    return { success: true, message: "Status updated successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update status" };
  }
}

// 🔴 অর্ডার ডিলিট
export async function deleteOrder(id: string) {
  try {
    await connectDB();
    
    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return { success: false, message: "Order already deleted or not found" };
    }

    // ডাটাবেস থেকে ডিলিট হওয়ার পর ক্যাশ ক্লিয়ার করা
    revalidatePath("/bemen-staff-portal/orders");
    
    return { success: true, message: "Order deleted successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to delete order" };
  }
}
"use server";

import { connectDB } from "@/db/dbConfig";
import { Order } from "@/models/Order";
import crypto from "crypto";
import { revalidatePath } from "next/cache";
import { headers, cookies } from "next/headers";
import { sendCapiEvent } from "@/lib/meta/capi";

export async function createOrder(orderData: any) {
  try {
    await connectDB();

    // ইউনিক আইডি জেনারেট (BEMEN-XXXXXX)
    const randomPart = crypto.randomBytes(3).toString("hex").toUpperCase();
    const customOrderId = `BEMEN-${randomPart}`;

    const finalOrderData = {
      orderId: customOrderId,
      customerName: orderData.customerName,
      phoneNumber: orderData.phoneNumber,
      altPhoneNumber: orderData.altPhoneNumber,
      address: orderData.address,
      city: orderData.city,
      notes: orderData.notes,
      items: orderData.items.map((item: any) => ({
        _id: item._id,        // MongoDB ID
        productId: item.productId, // Product Code (e.g. BMN-101)
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image
      })),
      subtotal: orderData.subtotal,
      deliveryCharge: orderData.deliveryCharge,
      totalAmount: orderData.totalAmount,
      status: "Pending"
    };

    const newOrder = await Order.create(finalOrderData);

    // Meta Conversions API (CAPI) - Send Server-Side Purchase Event
    try {
      const headerList = await headers();
      const cookieList = await cookies();

      const clientIp = headerList.get("x-forwarded-for")?.split(",")[0]?.trim() || headerList.get("x-real-ip") || "";
      const userAgent = headerList.get("user-agent") || "";
      const fbp = cookieList.get("_fbp")?.value || "";
      const fbc = cookieList.get("_fbc")?.value || "";

      const eventId = orderData.eventId || `evt_${Date.now()}_${newOrder.orderId}`;
      const contentIds = orderData.items.map((i: any) => String(i.productId || i._id));
      const contents = orderData.items.map((i: any) => ({
        id: String(i.productId || i._id),
        quantity: Number(i.quantity) || 1,
        item_price: Number(i.price) || 0,
      }));

      // Fire CAPI event in background without blocking response
      sendCapiEvent({
        eventName: "Purchase",
        eventId: eventId,
        eventSourceUrl: "https://thebemen.com/checkout",
        userData: {
          firstName: orderData.customerName,
          phone: orderData.phoneNumber,
          city: orderData.city,
          clientIp,
          userAgent,
          fbp,
          fbc,
        },
        customData: {
          currency: "BDT",
          value: orderData.totalAmount,
          content_type: "product",
          content_ids: contentIds,
          contents: contents,
          order_id: newOrder.orderId,
          num_items: orderData.items.reduce((acc: number, item: any) => acc + (item.quantity || 1), 0),
        },
      }).catch((err) => console.error("Async CAPI Purchase Error:", err));
    } catch (capiErr) {
      console.error("CAPI Header extraction error:", capiErr);
    }

    // নতুন অর্ডার আসার পর অ্যাডমিন পোর্টাল আপডেট করা
    revalidatePath("/bemen-staff-portal/orders");

    return {
      success: true,
      orderId: newOrder.orderId
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
    return {
      success: false,
      message: error.message || "Failed to update status",
    };
  }
}

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
    return {
      success: false,
      message: error.message || "Failed to delete order",
    };
  }
}

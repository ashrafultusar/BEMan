"use server";

import { connectDB } from "@/db/dbConfig";
import { Order } from "@/models/Order";
import Product from "@/models/Product";
import Category from "@/models/Category";

export async function getDashboardData() {
  try {
    await connectDB();

    // সব ডাটা একসাথে ফেচ করা (Performance ভালো রাখার জন্য Promise.all ব্যবহার করা হয়েছে)
    const [products, orders, categories] = await Promise.all([
      Product.find({}).lean(),
      Order.find({}).sort({ createdAt: -1 }).lean(),
      Category.find({}).lean()
    ]);

    // ১. রেভিনিউ ক্যালকুলেশন (শুধু 'Delivered' অর্ডারগুলোর টাকা যোগ হবে)
    const totalRevenue = orders
      .filter((order: any) => order.status?.toLowerCase() === "delivered")
      .reduce((acc: number, order: any) => acc + (order.totalAmount || 0), 0);

    // ২. সাম্প্রতিক ৫টি অর্ডার
    const recentOrders = orders.slice(0, 5);

    // ৩. ক্যাটাগরি অনুযায়ী প্রোডাক্ট সংখ্যা (Optional logic)
    // আপনি চাইলে ক্যাটাগরি আইটেমগুলোও এখান থেকে প্রসেস করে পাঠাতে পারেন

    return {
      success: true,
      data: {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        totalCategories: categories.length,
        recentOrders: JSON.parse(JSON.stringify(recentOrders)),
        categories: JSON.parse(JSON.stringify(categories))
      }
    };
  } catch (error) {
    console.error("Dashboard Data Error:", error);
    return { success: false, data: null };
  }
}
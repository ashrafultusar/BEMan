"use server";

import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";

export async function getProducts(searchQuery?: string) {
  try {
    await connectDB();
    
    // Filter Object toiri kora
    let filter: any = {};

    // Jodi search query thake, tobe name ba category-te search korbe
    if (searchQuery) {
      filter = {
        $or: [
          { name: { $regex: searchQuery, $options: "i" } }, // 'i' means case-insensitive
          { category: { $regex: searchQuery, $options: "i" } }
        ]
      };
    }

    // Database theke filtered data fetch kora
    const products = await Product.find(filter).sort({ createdAt: -1 });

    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(products)) 
    };
  } catch (error: any) {
    console.error("Get Products Error:", error);
    return { success: false, message: "Failed to fetch products", data: [] };
  }
}



export async function getProductById(id: string) {
  try {
    await connectDB();
    
    const product = await Product.findById(id);

    if (!product) {
      return { success: false, message: "Product not found", data: null };
    }

    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(product)) 
    };
  } catch (error: any) {
    console.error("Get Single Product Error:", error);
    return { success: false, message: "Failed to fetch product details", data: null };
  }
}
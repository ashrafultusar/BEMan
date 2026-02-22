
"use server";

import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";



export async function getProducts() {
  try {
    await connectDB();
    
    // Database theke shob product latest order-e fetch kora
    const products = await Product.find({}).sort({ createdAt: -1 });

    // Next.js Server Action theke plain object pathate hoy
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
"use server";

import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";

export async function getCategories() {
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ createdAt: -1 });
    
    // Server side data fetch logic
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(categories)) 
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, data: [] };
  }
}
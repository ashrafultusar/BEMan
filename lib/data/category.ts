"use server";

import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";
import { unstable_noStore as noStore } from 'next/cache'; 

export async function getCategories() {
  noStore();
  try {
    await connectDB();
    const categories = await Category.find({}).sort({ createdAt: -1 });
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(categories)) 
    };
  } catch (error) {
    console.error("Fetch Error:", error);
    return { success: false, data: [] };
  }
}
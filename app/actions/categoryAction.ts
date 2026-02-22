"use server";

import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";
import { uploadImage } from "@/lib/cloudinary"; // Agur banano function-ti
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    if (!imageFile || imageFile.size === 0) {
      return { success: false, message: "Please upload a category image" };
    }

    // Cloudinary upload
    const imageUrl = await uploadImage(imageFile, "categories");

    // Save to MongoDB
    await Category.create({
      name,
      description,
      image: imageUrl,
    });

    revalidatePath("/bemen-staff-portal/categories");
    return { success: true, message: "Category created successfully!" };
  } catch (error: any) {
    console.error("Category Error:", error);
    return { success: false, message: "Failed to create category" };
  }
}
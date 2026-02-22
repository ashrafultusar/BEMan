"use server";

import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";
import { uploadImage } from "@/lib/cloudinary"; 
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


export async function updateCategory(id: string, formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageFile = formData.get("image") as File;

    // ১. database theke existing category check kora
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return { success: false, message: "Category not found" };
    }

    let imageUrl = existingCategory.image;

    // ২. Jodi notun image select kora hoy (size > 0), tobe upload kora
    if (imageFile && imageFile.size > 0) {
      imageUrl = await uploadImage(imageFile, "categories");
    }

    // ৩. Database update kora
    await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image: imageUrl,
      },
      { new: true }
    );

    // ৪. Path revalidate kora jate list page refresh hoy
    revalidatePath("/bemen-staff-portal/categories");
    
    return { success: true, message: "Category updated successfully!" };
  } catch (error: any) {
    console.error("Update Category Error:", error);
    return { success: false, message: "Failed to update category" };
  }
}


export async function deleteCategory(id: string) {
  try {
    await connectDB();
    
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return { success: false, message: "Category not found" };
    }

    revalidatePath("/bemen-staff-portal/categories");
    return { success: true, message: "Category deleted successfully!" };
  } catch (error: any) {
    return { success: false, message: "Failed to delete category" };
  }
}
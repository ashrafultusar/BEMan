"use server";

import { connectDB } from "@/db/dbConfig";
import { uploadImage } from "@/lib/cloudinary";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export async function createProduct(prevState: any, formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const stock = formData.get("stock") as string;

    // Multiple images check
    const imageFiles = formData.getAll("images") as File[];
    
    // Prothome check kora image asholeo ache kina (empty file check)
    const validFiles = imageFiles.filter(file => file.name !== 'undefined' && file.size > 0);

    if (validFiles.length === 0) {
      return { success: false, message: "Please upload at least one valid image." };
    }

    // Parallel Upload to Cloudinary
    const uploadPromises = validFiles.map((file) => uploadImage(file, "products"));
    const imageUrls = await Promise.all(uploadPromises);

    const newProduct = new Product({
      name,
      price: Number(price),
      category,
      description,
      stock: Number(stock),
      images: imageUrls,
    });

    await newProduct.save();

    revalidatePath("/shop");
    revalidatePath("/bemen-staff-portal/products");
    
    return { success: true, message: "Product published successfully!" };
  } catch (error: any) {
    console.error("Post Error Details:", error);
    return { success: false, message: error.message || "Failed to publish product." };
  }
}
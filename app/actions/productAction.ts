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

    const imageFiles = formData.getAll("images") as File[];
    
    const validFiles = imageFiles.filter(file => file.name !== 'undefined' && file.size > 0);

    if (validFiles.length === 0) {
      return { success: false, message: "Please upload at least one valid image." };
    }

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


export async function updateProduct(id: string, formData: FormData) {
  try {
    await connectDB();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const category = formData.get("category") as string;

    const existingImagesRaw = formData.get("existingImages") as string;
    let finalImages: string[] = existingImagesRaw ? JSON.parse(existingImagesRaw) : [];

    const newFiles = formData.getAll("images") as File[];
    const validNewFiles = newFiles.filter(file => file.name !== 'undefined' && file.size > 0);

    if (validNewFiles.length > 0) {
      const uploadPromises = validNewFiles.map((file) => uploadImage(file, "products"));
      const newImageUrls = await Promise.all(uploadPromises);
      
      finalImages = [...finalImages, ...newImageUrls];
    }

    const updateData = {
      name,
      description,
      price,
      stock,
      category,
      images: finalImages,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) {
      return { success: false, message: "Product not found" };
    }

    // 5. Cache Refresh
    revalidatePath("/bemen-staff-portal/products");
    revalidatePath(`/bemen-staff-portal/edit-product/${id}`);
    revalidatePath("/shop"); 

    return { success: true, message: "Product updated successfully!" };

  } catch (error: any) {
    console.error("Update Error:", error);
    return { success: false, message: error.message || "Failed to update product" };
  }
}


export async function deleteProduct(id: string) {
  try {
      await connectDB();
      const product = await Product.findByIdAndDelete(id);
      
      if (!product) return { success: false, message: "Product not found" };

      revalidatePath("/bemen-staff-portal/products");
      return { success: true, message: "Product deleted successfully" };
  } catch (error) {
      return { success: false, message: "Something went wrong" };
  }
}
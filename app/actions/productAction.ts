"use server";

import { connectDB } from "@/db/dbConfig";
import { uploadImage } from "@/lib/cloudinary";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export async function createProduct(prevState: any, formData: FormData) {
  try {
    await connectDB();

    const productId = formData.get("productId") as string;
    const name = formData.get("name") as string;
    const price = formData.get("price") as string;
    const discountPrice = formData.get("discountPrice") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const stock = formData.get("stock") as string;
    const material = formData.get("material") as string;
    const care = formData.get("care") as string;
    const sizesRaw = formData.get("sizes") as string;

    const existingProduct = await Product.findOne({ productId });
    if (existingProduct) {
      return { success: false, message: "Error: This Product ID already exists." };
    }

    const sizes = sizesRaw
      ? sizesRaw.split(",").map((s) => s.trim().toUpperCase()).filter((s) => s !== "")
      : [];

    // Client-side provided image URLs
    const imageUrlsRaw = formData.get("imageUrls") as string;
    const imageUrls: string[] = imageUrlsRaw ? JSON.parse(imageUrlsRaw) : [];

    if (imageUrls.length === 0) {
      return { success: false, message: "Please upload at least one valid image." };
    }

    const newProduct = new Product({
      productId,
      name,
      price: Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : null,
      category,
      description,
      stock: Number(stock),
      images: imageUrls,
      sizes,
      material,
      care,
    });

    await newProduct.save();

    revalidatePath("/shop");
    revalidatePath("/bemen-staff-portal/products");

    return { success: true, message: `Product ${productId} published successfully!` };
  } catch (error: any) {
    console.error("Post Error:", error);
    return { success: false, message: error.message || "Failed to publish product." };
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    await connectDB();

    const productId = (formData.get("productId") as string)?.trim().toUpperCase();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const discountPrice = formData.get("discountPrice") ? Number(formData.get("discountPrice")) : null;
    const stock = Number(formData.get("stock"));
    const category = formData.get("category") as string;
    const material = formData.get("material") as string;
    const care = formData.get("care") as string;
    const sizes = (formData.get("sizes") as string)?.split(",").map(s => s.trim().toUpperCase()).filter(s => s !== "") || [];

    // productId চেক: অন্য কোনো প্রোডাক্টের এই আইডি আছে কি না (নিজের আইডি বাদে)
    const duplicateCheck = await Product.findOne({ productId, _id: { $ne: id } });
    if (duplicateCheck) {
      return { success: false, message: "This Product ID is already assigned to another product." };
    }

    const existingImagesRaw = formData.get("existingImages") as string;
    let finalImages: string[] = existingImagesRaw ? JSON.parse(existingImagesRaw) : [];

    const newImageUrlsRaw = formData.get("newImageUrls") as string;
    const newImageUrls: string[] = newImageUrlsRaw ? JSON.parse(newImageUrlsRaw) : [];

    if (newImageUrls.length > 0) {
      finalImages = [...finalImages, ...newImageUrls];
    }

    const updateData = {
      productId, // আপডেট করা হচ্ছে
      name,
      description,
      price,
      discountPrice,
      stock,
      category,
      images: finalImages,
      sizes,
      material,
      care
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedProduct) return { success: false, message: "Product not found" };

    revalidatePath("/bemen-staff-portal/products");
    revalidatePath("/shop");

    return { success: true, message: "Product updated successfully!" };
  } catch (error: any) {
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

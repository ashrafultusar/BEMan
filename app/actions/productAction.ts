"use server";

import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  await connectDB(); // DB connect kora holo

  const name = formData.get("name");
  const price = formData.get("price");
  const category = formData.get("category");
  const description = formData.get("description");

  try {
    const newProduct = new Product({
      name,
      price: Number(price), // String ke number-e convert kora holo
      category,
      description,
    });

    await newProduct.save(); // DB-te save holo

    revalidatePath("/shop"); // Shop page update koro
    return { success: true, message: "Product added successfully!" };
  } catch (error) {
    return { success: false, message: "Failed to add product" };
  }
}
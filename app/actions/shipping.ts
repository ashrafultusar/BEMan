"use server";
import { Shipping } from "@/models/Shipping";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/db/dbConfig";

export async function updateShippingCharges(data: { insideDhaka: number, outsideDhaka: number }) {
  try {
    await connectDB();
   
    await Shipping.findOneAndUpdate(
      {}, 
      { insideDhaka: data.insideDhaka, outsideDhaka: data.outsideDhaka },
      { upsert: true, new: true }
    );

    revalidatePath("/checkout"); 
    return { success: true, message: "Delivery charges updated!" };
  } catch (error) {
    return { success: false, message: "Failed to update charges." };
  }
}


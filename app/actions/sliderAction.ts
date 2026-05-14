"use server";

import { connectDB } from "@/db/dbConfig";
import Slider from "@/models/Slider";
import { uploadImage } from "@/lib/cloudinary";
import { revalidatePath } from "next/cache";

export async function createSlider(formData: FormData) {
    try {
        await connectDB();

        const ctaLink = formData.get("ctaLink") as string;
        const imageFile = formData.get("image") as File;

        if (!imageFile || imageFile.size === 0) {
            return { success: false, message: "Please upload an image for the slider" };
        }

        const imageUrl = await uploadImage(imageFile, "sliders");

        await Slider.create({
            ctaLink: ctaLink || "#",
            image: imageUrl,
        });

        revalidatePath("/bemen-staff-portal/sliders");
        revalidatePath("/"); // home page update
        return { success: true, message: "Slider created successfully!" };
    } catch (error: any) {
        console.error("Slider Create Error:", error);
        return { success: false, message: "Failed to create slider" };
    }
}

export async function updateSlider(id: string, formData: FormData) {
    try {
        await connectDB();

        const ctaLink = formData.get("ctaLink") as string;
        const imageFile = formData.get("image") as File;

        const existingSlider = await Slider.findById(id);
        if (!existingSlider) {
            return { success: false, message: "Slider not found" };
        }

        let imageUrl = existingSlider.image;

        if (imageFile && imageFile.size > 0) {
            imageUrl = await uploadImage(imageFile, "sliders");
        }

        await Slider.findByIdAndUpdate(
            id,
            { ctaLink: ctaLink || "#", image: imageUrl },
            { new: true }
        );

        revalidatePath("/bemen-staff-portal/sliders");
        revalidatePath("/"); // home page update
        return { success: true, message: "Slider updated successfully!" };
    } catch (error: any) {
        console.error("Slider Update Error:", error);
        return { success: false, message: "Failed to update slider" };
    }
}

export async function deleteSlider(id: string) {
    try {
        await connectDB();

        const slider = await Slider.findByIdAndDelete(id);

        if (!slider) {
            return { success: false, message: "Slider not found" };
        }

        revalidatePath("/bemen-staff-portal/sliders");
        revalidatePath("/"); // home page update
        return { success: true, message: "Slider deleted successfully!" };
    } catch (error: any) {
        return { success: false, message: "Failed to delete slider" };
    }
}

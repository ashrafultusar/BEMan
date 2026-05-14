import { connectDB } from "@/db/dbConfig";
import Slider from "@/models/Slider";

// Get all sliders (for list pages and frontend)
export async function getSliders() {
    try {
        await connectDB();
        // Sort by createdAt descending to show latest first
        const sliders = await Slider.find({}).sort({ createdAt: -1 }).lean();
        return sliders;
    } catch (error) {
        console.error("Error fetching sliders:", error);
        return [];
    }
}

// Get single slider by ID (for edit view)
export async function getSliderById(id: string) {
    try {
        await connectDB();
        const slider = await Slider.findById(id).lean();
        return slider;
    } catch (error) {
        console.error(`Error fetching slider ${id}:`, error);
        return null;
    }
}

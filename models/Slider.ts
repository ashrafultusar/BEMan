import mongoose, { Schema, model, models } from "mongoose";

const SliderSchema = new Schema({
    image: { type: String, required: true },
    ctaLink: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Slider = models.Slider || model("Slider", SliderSchema);
export default Slider;

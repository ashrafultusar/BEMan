import { v2 as cloudinary } from "cloudinary";

// Global config (Server start-e kaj kore)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: File, folder: string): Promise<string> => {
  try {
    // Debugging: Cloud name check kora (Log check korben)
    console.log("Using Cloud Name:", process.env.CLOUDINARY_CLOUD_NAME);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      const upload_stream = cloudinary.uploader.upload_stream(
        {
          // explicitly cloud_name pass kora jate 'auto' error na ashe
          cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
          folder: `bemen_store/${folder}`,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Detailed Error:", error);
            return reject(error);
          }
          resolve(result?.secure_url || "");
        }
      );

      upload_stream.end(buffer);
    });
  } catch (error) {
    console.error("Cloudinary Logic Error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
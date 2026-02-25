import { connectDB } from "@/db/dbConfig";
import { Shipping } from "@/models/Shipping";

export async function getShippingCharges() {
    try {
      await connectDB();
      const charge = await Shipping.findOne({});
      return charge ? JSON.parse(JSON.stringify(charge)) : { insideDhaka: 70, outsideDhaka: 150 };
    } catch (error) {
      return { insideDhaka: 70, outsideDhaka: 150 };
    }
  }
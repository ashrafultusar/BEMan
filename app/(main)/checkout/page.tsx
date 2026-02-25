
import { getShippingCharges } from "@/lib/data/shipping";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout | BEMEN Store",
  description: "Complete your purchase at BEMEN Store",
};

export default async function CheckoutPage() {
  // ডাটাবেস থেকে সরাসরি সার্ভারে চার্জ ফেচ করা হচ্ছে
  const shippingRates = await getShippingCharges();

  return (
    <CheckoutClient 
      initialRates={{
        insideDhaka: shippingRates?.insideDhaka || 70,
        outsideDhaka: shippingRates?.outsideDhaka || 150
      }} 
    />
  );
}
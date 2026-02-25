
import CheckoutForm from "@/components/main/order/CheckoutForm";
import { getShippingCharges } from "@/lib/data/shipping";



export const metadata = {
  title: "Checkout | BEMEN Store",
  description: "Complete your purchase at BEMEN Store",
};

export default async function CheckoutPage() {

  const shippingRates = await getShippingCharges();

  return (
    <CheckoutForm 
      initialRates={{
        insideDhaka: shippingRates?.insideDhaka || 70,
        outsideDhaka: shippingRates?.outsideDhaka || 150
      }} 
    />
  );
}
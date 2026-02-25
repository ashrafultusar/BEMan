import { getProductById, getProducts } from "@/lib/data/product";

import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";
import { getShippingCharges } from "@/lib/data/shipping";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // ৩টি রিকোয়েস্ট একসাথে পাঠানো হচ্ছে দ্রুত লোডিংয়ের জন্য
  const [productRes, allProductsRes, shippingRates] = await Promise.all([
    getProductById(id),
    getProducts(),
    getShippingCharges(),
  ]);

  if (!productRes.success || !productRes.data) {
    notFound();
  }

  const product = productRes.data;

  // রিলেটেড প্রোডাক্ট ফিল্টারিং
  const relatedProducts = allProductsRes.success
    ? allProductsRes.data
        .filter((p: any) => p.category === product.category && p._id.toString() !== product._id.toString())
        .slice(0, 5)
    : [];

  return (
    <ProductDetailsClient 
      product={JSON.parse(JSON.stringify(product))} 
      relatedProducts={JSON.parse(JSON.stringify(relatedProducts))} 
      shippingRates={{
        insideDhaka: shippingRates?.insideDhaka || 70,
        outsideDhaka: shippingRates?.outsideDhaka || 150
      }}
    />
  );
}
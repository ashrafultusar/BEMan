import { getProductById, getProducts } from "@/lib/data/product";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";
import { getShippingCharges } from "@/lib/data/shipping";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetching data in parallel for faster loading
  const [productRes, allProductsRes, shippingRates] = await Promise.all([
    getProductById(id),
    getProducts(),
    getShippingCharges(),
  ]);

  if (!productRes.success || !productRes.data) {
    notFound();
  }

  const product = productRes.data;

  // Related Products Filtering logic
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
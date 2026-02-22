import { getProductById, getProducts } from "@/lib/data/product";
import { notFound } from "next/navigation";
import ProductDetailsClient from "./ProductDetailsClient";

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [productRes, allProductsRes] = await Promise.all([
    getProductById(id),
    getProducts(),
  ]);

  if (!productRes.success || !productRes.data) {
    notFound();
  }

  const product = productRes.data;

  const relatedProducts = allProductsRes.success
    ? allProductsRes.data
        .filter((p: any) => p.category === product.category && p._id !== product._id)
        .slice(0, 5)
    : [];

  return (
    <ProductDetailsClient 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}
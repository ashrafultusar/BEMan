import ProductListClient from "@/components/admin/product/ProductCard";
import { getProducts } from "@/lib/data/product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inventory Management | BEMEN Staff Portal",
  description: "Manage your premium product inventory.",
  robots: { index: false, follow: false },
};

export default async function ProductsPage() {
  const result = await getProducts();
  const products = result.success ? result.data : [];

  // Ekhane ProductListClient use koro
  return <ProductListClient products={products} />;
}
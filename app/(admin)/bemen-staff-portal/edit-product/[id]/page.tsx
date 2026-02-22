import EditProductForm from "@/components/admin/product/EditProductForm";
import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;

    const product = await Product.findById(id);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-10">
            <header className="mb-10">
                <h1 className="text-3xl font-serif font-bold text-gray-900">Edit Product</h1>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">
                    Update inventory details for SKU: {id.slice(-8)}
                </p>
            </header>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-10">
                <EditProductForm 
                    product={{
                        _id: product._id.toString(),
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        stock: product.stock,
                        category: product.category,
                        images: product.images || [],
                    }} 
                />
            </div>
        </div>
    );
}
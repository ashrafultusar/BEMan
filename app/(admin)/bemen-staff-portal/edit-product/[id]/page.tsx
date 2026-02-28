import EditProductForm from "@/components/admin/product/EditProductForm";
import { connectDB } from "@/db/dbConfig";
import Product from "@/models/Product";
import Category from "@/models/Category";
import { notFound } from "next/navigation";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    const { id } = await params;

    const [product, categories] = await Promise.all([
        Product.findById(id),
        Category.find({}).lean()
    ]);

    if (!product) {
        notFound();
    }

    return (
        <div className="max-w-5xl mx-auto p-6 md:p-10 bg-[#fcfcfc] min-h-screen">
            <header className="mb-10">
                <h1 className="text-3xl font-serif font-black uppercase tracking-tight text-gray-900">Edit Product</h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Editing: {product.productId || id.slice(-8)}
                </p>
            </header>

            <EditProductForm 
                categories={JSON.parse(JSON.stringify(categories))}
                product={{
                    _id: product._id.toString(),
                    productId: product.productId || "",
                    name: product.name,
                    description: product.description,
                    price: product.price,
                    discountPrice: product.discountPrice ?? null,
                    stock: product.stock,
                    category: product.category,
                    images: product.images || [],
                    sizes: product.sizes || [],
                    material: product.material || "",
                    care: product.care || "",
                }} 
            />
        </div>
    );
}
import EditCategoryForm from "@/components/admin/category/EditCategoryForm";
import { connectDB } from "@/db/dbConfig";
import Category from "@/models/Category";
import { notFound } from "next/navigation";

export default async function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
    await connectDB();

    const { id } = await params;
    const category = await Category.findById(id);

    if (!category) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-6 md:p-10">
            <div className="mb-8">
                <h1 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
                    Edit Category
                </h1>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                    Update collection details and thumbnail
                </p>
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-10">
                <EditCategoryForm 
                    category={{
                        _id: category._id.toString(),
                        name: category.name,
                        description: category.description,
                        image: category.image,
                    }} 
                />
            </div>
        </div>
    );
}
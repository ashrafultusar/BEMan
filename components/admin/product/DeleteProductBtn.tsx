"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/productAction";
import { toast } from "react-hot-toast";

export default function DeleteProductBtn({ id }: { id: string }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        setIsDeleting(true);
        const res = await deleteProduct(id);
        
        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
            setIsDeleting(false);
        }
    };

    return (
        <button 
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-gray-400 cursor-pointer hover:text-red-600 transition-colors disabled:opacity-50"
        >
            {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
        </button>
    );
}
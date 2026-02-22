"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteCategory } from "@/app/actions/categoryAction";
import { toast } from "react-hot-toast";

export default function DeleteCategoryBtn({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      const res = await deleteCategory(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1 text-gray-400 hover:text-red-600 transition-colors text-[10px] font-black uppercase tracking-widest group/btn cursor-pointer disabled:opacity-50"
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : (
        <Trash2 size={14} className="group-hover/btn:scale-110 transition-transform" />
      )}
      {loading ? "Deleting..." : ""}
    </button>
  );
}
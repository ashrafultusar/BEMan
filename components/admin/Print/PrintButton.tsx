"use client";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button 
      onClick={() => window.print()}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-lg no-print cursor-pointer"
    >
      <Printer size={18} /> Print Invoice
    </button>
  );
}
import React from 'react';
import { UserCog, UserPlus } from "lucide-react";
import Link from 'next/link';
import { getUsers } from '@/lib/data/user'; //
import AdminTable from '@/components/admin/admin/AdminTable';

export default async function AdminManagementPage() {
  const staffList = await getUsers(); //

  return (
    <div className="min-h-screen p-6 ">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#1a202c] flex items-center gap-2 uppercase tracking-tighter italic">
            <UserCog className="text-amber-500" /> Admin Management
          </h1>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
            {staffList.length} Total Users Found in Database
          </p>
        </div>
        
        <Link 
          href="/register" 
          className="flex items-center gap-2 bg-black hover:bg-zinc-800 text-white px-6 py-3 rounded-lg font-bold transition-all shadow-lg active:scale-95 text-xs uppercase tracking-widest"
        >
          <UserPlus size={16} />
          Add Admin
        </Link>
      </div>

      {/* Table Container */}
      <div className="bg-white max-w-5xl mx-auto rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <AdminTable initialUsers={staffList} />
      </div>
    </div>
  );
}
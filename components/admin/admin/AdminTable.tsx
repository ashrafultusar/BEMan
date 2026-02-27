"use client";

import React from 'react';
import { Mail, ShieldAlert, UserCheck, ShieldCheck, Trash2 } from "lucide-react";
import { deleteUser, toggleUserRole } from '@/lib/data/user'; //
import { useRouter } from 'next/navigation';

export default function AdminTable({ initialUsers }: { initialUsers: any[] }) {
  const router = useRouter();

  const handleToggle = async (id: string, role: string) => {
    await toggleUserRole(id, role);
    router.refresh(); // সার্ভার থেকে নতুন ডাটা আনবে
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure? This action cannot be undone.")) {
      await deleteUser(id);
      router.refresh();
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#f8f9fa] border-b border-gray-200">
          <tr>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">User Info</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Role</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {initialUsers.map((user: any) => (
            <tr key={user._id} className="hover:bg-gray-50 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-zinc-900 flex items-center justify-center text-white font-black text-sm shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-black text-[#1a202c] uppercase text-sm tracking-tight">{user.name}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 font-medium italic">
                      <Mail size={12}/> {user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest border ${
                  user.role === 'admin' 
                    ? 'bg-amber-50 text-amber-600 border-amber-100' 
                    : 'bg-zinc-100 text-zinc-600 border-zinc-200'
                }`}>
                  {user.role === 'admin' ? <ShieldAlert size={10}/> : <UserCheck size={10}/>}
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => handleToggle(user._id, user.role)}
                    className="p-2 rounded-md hover:bg-amber-50 text-gray-400 hover:text-amber-600 transition-all border border-transparent hover:border-amber-100"
                    title="Change Role"
                  >
                    <ShieldCheck size={18} />
                  </button>
                  <button 
                    onClick={() => handleDelete(user._id)}
                    className="p-2 rounded-md hover:bg-red-50 text-gray-400 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
                    title="Delete User"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
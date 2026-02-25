"use client";

import { Eye, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { deleteOrder, updateOrderStatus } from '@/app/actions/orderAction';

const OrderTable = ({ initialOrders }: { initialOrders: any[] }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  // সার্ভার থেকে নতুন ডাটা আসলে আপডেট করার জন্য
  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-red-100 text-red-700';
      case 'cancelled': return 'bg-gray-100 text-gray-500';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setLoadingId(id);
    const res = await updateOrderStatus(id, newStatus);
    if (res.success) {
      setOrders(prev => prev.map(o => o._id === id ? { ...o, status: newStatus } : o));
    } else {
      alert(res.message);
    }
    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure? This will delete from database permanently!")) return;

    setLoadingId(id);
    const res = await deleteOrder(id);
    if (res.success) {
      // লোকাল স্টেট থেকে ডিলিট
      setOrders(prev => prev.filter(o => o._id !== id));
      // সার্ভার ক্যাশ আপডেট
      router.refresh();
    } else {
      alert(res.message);
    }
    setLoadingId(null);
  };

  return (
    <div className="p-8 bg-[#f9f7f5] min-h-screen">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50 text-[11px] font-black text-gray-500 uppercase tracking-widest">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Status Update</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-bold font-mono">{order.orderId}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-bold text-gray-900">{order.customerName}</div>
                  <div className="text-xs text-gray-500">{order.phoneNumber}</div>
                </td>
                
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      disabled={loadingId === order._id}
                      className={`text-[10px] font-black uppercase px-2 py-1 rounded-md cursor-pointer outline-none ${getStatusStyle(order.status)}`}
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {loadingId === order._id && <Loader2 size={16} className="animate-spin text-blue-500" />}
                    <Link href={`/bemen-staff-portal/orders/${order._id}`} className="p-2 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-all">
                      <Eye size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(order._id)}
                      disabled={loadingId === order._id}
                      className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white cursor-pointer transition-all"
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
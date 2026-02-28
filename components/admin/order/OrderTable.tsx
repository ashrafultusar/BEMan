"use client";

import { Eye, Trash2, Loader2, ShoppingCart, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { deleteOrder, updateOrderStatus } from '@/app/actions/orderAction';

const OrderTable = ({ initialOrders }: { initialOrders: any[] }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const router = useRouter();

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  // --- Filter Logic ---
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phoneNumber.includes(searchQuery);
      
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  // --- Stats Calculation based on filtered data or total data ---
  const totalOrders = orders.length;
  const deliveredOrders = orders.filter(o => o.status.toLowerCase() === 'delivered').length;
  const cancelledOrders = orders.filter(o => o.status.toLowerCase() === 'cancelled').length;

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
    if (!confirm("Are you sure?")) return;
    setLoadingId(id);
    const res = await deleteOrder(id);
    if (res.success) {
      setOrders(prev => prev.filter(o => o._id !== id));
      router.refresh();
    } else {
      alert(res.message);
    }
    setLoadingId(null);
  };

  return (
    <div className="p-4 md:p-8 bg-[#f9f7f5] min-h-screen space-y-6">
      
      {/* --- Quick Stats --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 border border-gray-200 rounded-xl flex items-center gap-4 shadow-sm">
           <div className="bg-gray-900 text-white p-2 rounded-lg"><ShoppingCart size={20} /></div>
           <div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Total Orders</p>
             <p className="text-xl font-black text-gray-900">{totalOrders}</p>
           </div>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl flex items-center gap-4 shadow-sm">
           <div className="bg-green-600 text-white p-2 rounded-lg"><CheckCircle size={20} /></div>
           <div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Delivered</p>
             <p className="text-xl font-black text-green-600">{deliveredOrders}</p>
           </div>
        </div>
        <div className="bg-white p-4 border border-gray-200 rounded-xl flex items-center gap-4 shadow-sm">
           <div className="bg-red-500 text-white p-2 rounded-lg"><XCircle size={20} /></div>
           <div>
             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Cancelled</p>
             <p className="text-xl font-black text-red-500">{cancelledOrders}</p>
           </div>
        </div>
      </div>

      {/* --- Filter & Search Section --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text"
            placeholder="Search by Order ID, Name or Phone..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-black transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={18} className="text-gray-400 hidden sm:block" />
          <select 
            className="w-full md:w-48 px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm font-bold text-gray-600 outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden rounded-xl">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b bg-gray-50 text-[11px] font-black text-gray-500 uppercase tracking-widest">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status Update</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="even:bg-[#fcfcfc] hover:bg-gray-100/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold font-mono whitespace-nowrap text-gray-600">
                    #{order.orderId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{order.customerName}</div>
                    <div className="text-xs text-gray-500">{order.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      disabled={loadingId === order._id}
                      className={`text-[10px] font-black uppercase px-2 py-1.5 rounded-md cursor-pointer outline-none border-none transition-all ${getStatusStyle(order.status)}`}
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {loadingId === order._id && <Loader2 size={16} className="animate-spin text-blue-500" />}
                      <Link href={`/bemen-staff-portal/orders/${order._id}`} className="p-2 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-all inline-block">
                        <Eye size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(order._id)}
                        disabled={loadingId === order._id}
                        className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
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

        {filteredOrders.length === 0 && (
          <div className="p-20 text-center">
            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No match found</p>
          </div>
        )}
      </div>
      
      <div className="mt-4 md:hidden text-center">
         <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] animate-pulse">
           ← Scroll to view more →
         </p>
      </div>
    </div>
  );
};

export default OrderTable;
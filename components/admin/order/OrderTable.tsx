"use client";
 
import { Eye, Trash2 } from 'lucide-react';
import Link from 'next/link';

const OrderTable = ({ initialOrders }: { initialOrders: any[] }) => {
  
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-8 bg-[#f9f7f5] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-serif font-bold">Total Orders ({initialOrders.length})</h1>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-sm shadow-sm overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {initialOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium">
                  {order.orderId}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-700">{order.customerName}</div>
                  <div className="text-xs text-gray-400">{order.phoneNumber}</div>
                </td>
                <td className="px-6 py-4 text-sm font-semibold">৳{order.totalAmount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link 
                      href={`/bemen-staff-portal/orders/${order._id}`} 
                      className="text-gray-500 hover:text-black p-1 transition-colors"
                    >
                      <Eye size={18} />
                    </Link>
                    <button className="text-red-400 hover:text-red-600 transition-colors cursor-pointer">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {initialOrders.length === 0 && (
          <div className="text-center py-20 text-gray-500">No orders found.</div>
        )}
      </div>
    </div>
  );
};

export default OrderTable;
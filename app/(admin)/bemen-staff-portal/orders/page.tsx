import { Eye, ChevronDown, Trash2 } from 'lucide-react';
import Link from 'next/link';

 type OrderStatus = 'delivered' | 'shipped' | 'processing' | 'pending';

 interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: OrderStatus;
  date: string;
}


const orders: Order[] = [
  { id: 'ORD-001', customerName: 'Rahim Ahmed', customerEmail: 'rahim@example.com', total: 2400, status: 'delivered', date: '2025-02-10' },
  { id: 'ORD-002', customerName: 'Karim Hassan', customerEmail: 'karim@example.com', total: 8500, status: 'shipped', date: '2025-02-14' },
  { id: 'ORD-003', customerName: 'Fatima Begum', customerEmail: 'fatima@example.com', total: 6000, status: 'processing', date: '2025-02-16' },
  { id: 'ORD-004', customerName: 'Arif Khan', customerEmail: 'arif@example.com', total: 12000, status: 'pending', date: '2025-02-17' },
];

const OrderTable = () => {
    return (
      <div className="p-8 bg-[#f9f7f5] min-h-screen">
        <h1 className="text-2xl font-serif font-bold mb-6">Orders</h1>
        
        <div className="bg-white border border-gray-200 rounded-sm">
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-700">{order.customerName}</div>
                    <div className="text-xs text-gray-400">{order.customerEmail}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold">৳{order.total}</td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center justify-between w-28 px-2 py-1 rounded text-xs">
                       {/* স্ট্যাটাস চিপ কোড */}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">{order.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                    <Link 
                      href={`/bemen-staff-portal/orders/${order.id}`} 
                      className="text-gray-500 hover:text-black p-1"
                    >
                      <Eye size={18} />
                    </Link>
                      <button className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"><Trash2 size={18}/></button>
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
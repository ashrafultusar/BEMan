"use client";
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Package, User, Calendar, CreditCard } from 'lucide-react';

export default function OrderDetails() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id;

  // বাস্তব ক্ষেত্রে এখানে API থেকে ডাটা ফেচ করবেন
  // আপাতত আমরা একটি ডামি ডাটা দেখাচ্ছি
  const order = {
    id: orderId,
    customer: "Rahim Ahmed",
    email: "rahim@example.com",
    date: "2025-02-10",
    total: 2400,
    status: "Delivered",
    items: [
      { name: "Premium T-Shirt", qty: 2, price: 1200 }
    ]
  };

  return (
    <div className="p-8 min-h-screen">
      {/* Back Button */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors cursor-pointer"
      >
        <ArrowLeft size={20} /> Back to Orders
      </button>

      <div className="max-w-4xl mx-auto bg-white border border-gray-200 shadow-sm rounded-md overflow-hidden">
        <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
          <h2 className="text-xl font-bold">Order Details: {order.id}</h2>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-bold uppercase">
            {order.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          {/* Customer Info */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-semibold text-gray-700 border-b pb-2">
              <User size={18}/> Customer Information
            </h3>
            <p className="text-sm text-gray-600">Name: <span className="text-black font-medium">{order.customer}</span></p>
            <p className="text-sm text-gray-600">Email: <span className="text-black font-medium">{order.email}</span></p>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 font-semibold text-gray-700 border-b pb-2">
              <Calendar size={18}/> Order Summary
            </h3>
            <p className="text-sm text-gray-600">Date: <span className="text-black font-medium">{order.date}</span></p>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <CreditCard size={16}/> Total Amount: <span className="text-orange-600 font-bold">৳{order.total}</span>
            </p>
          </div>
        </div>

        {/* Item List */}
        <div className="p-8 pt-0">
          <h3 className="flex items-center gap-2 font-semibold text-gray-700 border-b pb-4 mb-4">
            <Package size={18}/> Items
          </h3>
          <div className="bg-gray-50 p-4 rounded-md">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span>{item.name} (x{item.qty})</span>
                <span className="font-bold text-gray-800">৳{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
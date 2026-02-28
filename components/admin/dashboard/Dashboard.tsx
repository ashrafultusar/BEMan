"use client";

import React from 'react';
import { Package, ShoppingCart, DollarSign, Layers, ImageIcon } from 'lucide-react';

const Dashboard = ({ data }: { data: any }) => {
  const { totalProducts, totalOrders, totalRevenue, totalCategories, recentOrders, categories } = data;

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'shipped': return 'text-blue-600 bg-blue-50';
      case 'processing': return 'text-amber-600 bg-amber-50';
      case 'pending': return 'text-red-500 bg-red-50';
      case 'cancelled': return 'text-gray-500 bg-gray-100';
      default: return 'text-gray-400 bg-gray-50';
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#f9f7f5] min-h-screen space-y-6 md:space-y-8 font-sans">
      
      {/* --- Header Section --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-xl md:text-2xl font-black text-[#1a1a1a] uppercase tracking-tighter">
          BEMEN Dashboard
        </h1>
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-3 py-1 border border-gray-200 rounded-full shadow-sm">
          Live Stats
        </div>
      </div>

      {/* --- Stat Cards Section --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Package size={20} />} label="Total Products" value={totalProducts} />
        <StatCard icon={<ShoppingCart size={20} />} label="Total Orders" value={totalOrders} />
        <StatCard icon={<DollarSign size={20} />} label="Delivered Revenue" value={`৳${totalRevenue.toLocaleString()}`} />
        <StatCard icon={<Layers size={20} />} label="Categories" value={totalCategories} />
      </div>

      {/* --- Main Content Grid --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8">
        
        {/* --- Recent Orders --- */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm overflow-hidden">
          <h2 className="text-[11px] font-black mb-6 uppercase tracking-[0.2em] text-gray-400">
            Recent Orders
          </h2>
          <div className="space-y-6">
            {recentOrders.map((order: any) => (
              <OrderItem 
                key={order._id}
                id={order.orderId} 
                name={order.customerName} 
                amount={order.totalAmount.toLocaleString()} 
                status={order.status} 
                color={getStatusStyle(order.status)} 
              />
            ))}
            {recentOrders.length === 0 && (
              <p className="text-gray-400 italic text-sm py-10 text-center">No orders yet.</p>
            )}
          </div>
        </div>

        {/* --- Categories List --- */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 md:p-6 shadow-sm">
          <h2 className="text-[11px] font-black mb-6 uppercase tracking-[0.2em] text-gray-400">
            Category List
          </h2>
          <div className="divide-y divide-gray-100">
            {categories.slice(0, 6).map((cat: any) => (
              <CategoryItem 
                key={cat._id} 
                name={cat.name} 
                slug={cat.slug} 
                image={cat.image} 
              />
            ))}
            {categories.length === 0 && (
              <p className="text-gray-400 italic text-sm py-10 text-center">No categories found.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Sub Components ---

const StatCard = ({ icon, label, value }: any) => (
  <div className="bg-white border border-gray-200 p-5 md:p-6 rounded-xl shadow-sm flex flex-col gap-4 transition-all hover:shadow-md">
    <div className="bg-black text-white p-2 w-fit rounded-lg shadow-lg">
      {icon}
    </div>
    <div>
      <div className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter leading-none">
        {value}
      </div>
      <div className="text-[10px] text-gray-400 uppercase font-black tracking-[0.15em] mt-2 leading-tight">
        {label}
      </div>
    </div>
  </div>
);

const OrderItem = ({ id, name, amount, status, color }: any) => (
  <div className="flex justify-between items-center border-b border-gray-50 pb-4 last:border-0 last:pb-0 gap-2">
    <div className="min-w-0">
      <div className="text-sm font-black text-black uppercase tracking-tighter truncate">
        #{id}
      </div>
      <div className="text-[11px] font-bold text-gray-400 truncate">
        {name}
      </div>
    </div>
    <div className="text-right flex-shrink-0">
      <div className="text-sm font-black text-black">৳{amount}</div>
      <div className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-black mt-1 inline-block tracking-tighter ${color}`}>
        {status}
      </div>
    </div>
  </div>
);

const CategoryItem = ({ name, slug, image }: any) => (
  <div className="flex justify-between items-center py-3 first:pt-0 last:pb-0 group">
    <div className="flex flex-col min-w-0">
      <span className="text-sm font-bold text-gray-800 leading-tight group-hover:text-black transition-colors truncate">
        {name}
      </span>
      <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest mt-0.5 truncate">
        {slug}
      </span>
    </div>

    <div className="w-10 h-10 md:w-11 md:h-11 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm group-hover:border-black transition-all ml-4">
      {image ? (
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      ) : (
        <ImageIcon className="text-gray-200" size={18} />
      )}
    </div>
  </div>
);

export default Dashboard;
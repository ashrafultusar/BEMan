import React from 'react';
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="p-8 bg-[#f9f7f5] min-h-screen space-y-8">
      <h1 className="text-2xl font-serif font-bold text-[#1a1a1a]">Dashboard</h1>

      {/* --- Stat Cards Section --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Package size={20} />} label="Products" value="12" />
        <StatCard icon={<ShoppingCart size={20} />} label="Orders" value="4" />
        <StatCard icon={<DollarSign size={20} />} label="Revenue" value="৳28,900" />
        <StatCard icon={<Users size={20} />} label="Admins" value="3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* --- Recent Orders Section --- */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
          <h2 className="text-lg font-serif font-bold mb-6">Recent Orders</h2>
          <div className="space-y-6">
            <OrderItem id="ORD-001" name="Rahim Ahmed" amount="2,400" status="delivered" color="text-orange-600 bg-orange-50" />
            <OrderItem id="ORD-002" name="Karim Hassan" amount="8,500" status="shipped" color="text-red-400 bg-red-50" />
            <OrderItem id="ORD-003" name="Fatima Begum" amount="6,000" status="processing" color="text-gray-400 bg-gray-50" />
            <OrderItem id="ORD-004" name="Arif Khan" amount="12,000" status="pending" color="text-red-500 bg-red-50" />
          </div>
        </div>

        {/* --- Categories Section --- */}
        <div className="bg-white border border-gray-200 rounded-sm p-6 shadow-sm">
          <h2 className="text-lg font-serif font-bold mb-6">Categories</h2>
          <div className="divide-y divide-gray-100">
            <CategoryItem name="T-Shirts" count="8" />
            <CategoryItem name="Shirts" count="6" />
            <CategoryItem name="Pants" count="5" />
            <CategoryItem name="Jackets" count="4" />
            <CategoryItem name="Accessories" count="3" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const StatCard = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-sm shadow-sm flex flex-col gap-3">
    <div className="bg-[#fdf2f0] text-[#d97d6d] p-2 w-fit rounded-md">{icon}</div>
    <div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs text-gray-400 uppercase tracking-wider">{label}</div>
    </div>
  </div>
);

const OrderItem = ({ id, name, amount, status, color }: any) => (
  <div className="flex justify-between items-start border-b border-gray-100 pb-4 last:border-0 last:pb-0">
    <div>
      <div className="text-sm font-bold text-gray-800">{id}</div>
      <div className="text-xs text-gray-400">{name}</div>
    </div>
    <div className="text-right space-y-1">
      <div className="text-sm font-bold text-gray-800">৳{amount}</div>
      <div className={`text-[10px] px-2 py-0.5 rounded capitalize font-medium ${color}`}>
        {status}
      </div>
    </div>
  </div>
);

const CategoryItem = ({ name, count }: { name: string, count: string }) => (
  <div className="flex justify-between items-center py-4 first:pt-0 last:pb-0">
    <span className="text-sm font-medium text-gray-700">{name}</span>
    <span className="text-xs text-gray-400">{count} products</span>
  </div>
);

export default Dashboard;
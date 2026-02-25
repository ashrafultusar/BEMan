import PrintButton from "@/components/admin/Print/PrintButton";
import InvoicePrint from "@/components/admin/Print/InvoicePrint"; // ইমপোর্ট করা হয়েছে
import { getOrderById } from "@/lib/data/order";
import { ArrowLeft, Package, User, Calendar, CreditCard, MapPin } from 'lucide-react';
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OrderDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getOrderById(id);

  if (!response.success) {
    notFound();
  }

  const order = response.data;

  const statusStyles: { [key: string]: string } = {
    Pending: "bg-orange-100 text-orange-600",
    Processing: "bg-blue-100 text-blue-600",
    Shipped: "bg-purple-100 text-purple-600",
    Delivered: "bg-green-100 text-green-600",
    Cancelled: "bg-red-100 text-red-600",
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gray-50">
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          @page { margin: 0; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="max-w-4xl mx-auto">
        
        {/* Actions */}
        <div className="flex justify-between items-center mb-6 no-print">
          <Link 
            href="/bemen-staff-portal/orders"
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft size={20} /> Back to Orders
          </Link>
          <PrintButton />
        </div>

        {/* 📱 Screen UI */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden no-print">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-black flex items-center gap-2">
                Order ID: <span className="text-blue-600 font-mono">{order.orderId}</span>
              </h2>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${statusStyles[order.status] || "bg-gray-100 text-gray-600"}`}>
              {order.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b">
            <div className="p-8 border-r border-gray-100 space-y-4">
              <h3 className="flex items-center gap-2 font-bold text-gray-800 uppercase text-xs tracking-widest border-b pb-3">
                <User size={16} className="text-blue-500"/> Customer
              </h3>
              <p className="text-base font-bold text-black">{order.customerName}</p>
              <p className="text-sm text-gray-500 font-bold">{order.phoneNumber}</p>
            </div>

            <div className="p-8 space-y-4">
              <h3 className="flex items-center gap-2 font-bold text-gray-800 uppercase text-xs tracking-widest border-b pb-3">
                <MapPin size={16} className="text-red-500"/> Shipping Address
              </h3>
              <p className="text-sm font-medium text-gray-700 italic">{order.address}</p>
            </div>
          </div>

          <div className="p-8">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 uppercase text-xs tracking-widest border-b pb-4 mb-4">
              <Package size={16} className="text-orange-500"/> Items Ordered ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded border flex items-center justify-center">
                      {item.image ? <img src={item.image} alt="" className="object-cover" /> : <Package size={16} />}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">৳{item.price} x {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-black">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-gray-50 border-t flex justify-end">
             <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Total Amount</p>
                <p className="text-3xl font-black text-green-600">৳{order.totalAmount}</p>
             </div>
          </div>
        </div>

        {/* 🖨️ Separate Print Component */}
        <InvoicePrint order={order} />

      </div>
    </div>
  );
}
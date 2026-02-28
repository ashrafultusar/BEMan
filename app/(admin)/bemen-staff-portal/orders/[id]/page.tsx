import PrintButton from "@/components/admin/Print/PrintButton";
import InvoicePrint from "@/components/admin/Print/InvoicePrint";
import { getOrderById } from "@/lib/data/order";
import { ArrowLeft, Package, User, MapPin, Phone, StickyNote, Globe } from 'lucide-react';
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
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-sm uppercase tracking-tight"
          >
            <ArrowLeft size={18} /> Back to Orders
          </Link>
          <PrintButton />
        </div>

        {/* 📱 Screen UI */}
        <div className="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden no-print">
          
          {/* Header */}
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Order Details</p>
              <h2 className="text-xl font-black flex items-center gap-2">
                ID: <span className="text-blue-600 font-mono">{order.orderId}</span>
              </h2>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${statusStyles[order.status] || "bg-gray-100 text-gray-600"}`}>
              {order.status}
            </span>
          </div>

          {/* Customer & Shipping Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-b">
            {/* Customer Info */}
            <div className="p-8 border-r border-gray-100 space-y-4">
              <h3 className="flex items-center gap-2 font-bold text-gray-800 uppercase text-[10px] tracking-widest border-b pb-3">
                <User size={14} className="text-blue-500"/> Customer Info
              </h3>
              <div>
                <p className="text-lg font-black text-black">{order.customerName}</p>
                <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-600 font-bold flex items-center gap-2">
                        <Phone size={14} className="text-gray-400"/> {order.phoneNumber}
                    </p>
                    {order.altPhoneNumber && (
                        <p className="text-xs text-gray-400 font-medium flex items-center gap-2">
                            <Phone size={12} /> Alt: {order.altPhoneNumber}
                        </p>
                    )}
                </div>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="p-8 space-y-4">
              <h3 className="flex items-center gap-2 font-bold text-gray-800 uppercase text-[10px] tracking-widest border-b pb-3">
                <MapPin size={14} className="text-red-500"/> Shipping Details
              </h3>
              <div className="space-y-2">
                <p className="text-sm font-bold text-gray-800 flex items-center gap-2">
                    <Globe size={14} className="text-gray-400"/> Area: 
                    <span className={`px-2 py-0.5 rounded text-[10px] ${order.city === 'Dhaka' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                        {order.city === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}
                    </span>
                </p>
                <p className="text-sm font-medium text-gray-600 leading-relaxed italic">
                    {order.address}
                </p>
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="p-8">
            <h3 className="flex items-center gap-2 font-bold text-gray-800 uppercase text-[10px] tracking-widest border-b pb-4 mb-4">
              <Package size={14} className="text-orange-500"/> Items Ordered ({order.items.length})
            </h3>
            <div className="space-y-3">
              {order.items.map((item: any, index: number) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-14 bg-white rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center shrink-0">
                      {item.image ? (
                        <img src={item.image} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <Package size={20} className="text-gray-300" />
                      )}
                    </div>
                    <div>
                      <p className="font-black text-sm text-gray-900">{item.name}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded">
                           SIZE: {item.size}
                        </span>
                        <p className="text-xs text-gray-500 font-bold">৳{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                  <span className="font-black text-gray-900">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notes Section (Only shows if exists) */}
          {order.notes && (
            <div className="px-8 pb-8">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                    <h4 className="flex items-center gap-2 text-[10px] font-black uppercase text-amber-700 mb-2">
                        <StickyNote size={14} /> Delivery Instruction/Note
                    </h4>
                    <p className="text-sm text-amber-900 font-medium leading-relaxed">
                        {order.notes}
                    </p>
                </div>
            </div>
          )}

          {/* Summary Section */}
          <div className="p-8 bg-gray-50 border-t flex flex-col md:flex-row justify-between items-center gap-6">
             <div className="flex gap-8">
                <div className="text-center md:text-left">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Subtotal</p>
                    <p className="font-bold text-gray-700">৳{order.subtotal}</p>
                </div>
                <div className="text-center md:text-left">
                    <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Delivery</p>
                    <p className="font-bold text-gray-700">৳{order.deliveryCharge}</p>
                </div>
             </div>

             <div className="text-center md:text-right">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Grand Total</p>
                <p className="text-4xl font-black text-green-600 tracking-tighter">৳{order.totalAmount}</p>
             </div>
          </div>
        </div>

        {/* 🖨️ Separate Print Component (Size & New data update inside this component too) */}
        <InvoicePrint order={order} />

      </div>
    </div>
  );
}
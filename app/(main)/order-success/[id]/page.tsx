import { CheckCircle2, Package, Truck, Phone, Home, ShoppingBag, Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/data/order";

export default async function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const response = await getOrderById(id);

  if (!response.success) {
    notFound();
  }

  const order = response.data;

  // তারিখ ফরম্যাট করার জন্য
  const orderDate = new Date(order.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <main className="min-h-screen bg-gray-50 py-12 md:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Success Message Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="bg-black p-10 text-center text-white">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <CheckCircle2 size={48} className="text-green-400 animate-pulse" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2 uppercase tracking-tight">Order Confirmed!</h1>
            <p className="text-gray-400 text-sm">Thank you for shopping with <span className="text-white font-bold">BEMEN</span>. Your order has been placed.</p>
            
            <div className="mt-6 flex flex-col items-center gap-2">
              <div className="inline-block bg-white/10 px-6 py-3 rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">Tracking ID</p>
                <p className="font-mono font-black text-xl md:text-2xl text-white">
                  {/* ডাইনামিক কাস্টম আইডি */}
                  {order.customOrderId || `BEMEN-#${order._id.slice(-6).toUpperCase()}`}
                </p>
              </div>
              <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-2">
                <Calendar size={12} /> Ordered on: {orderDate}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Shipping Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-2 uppercase text-xs tracking-wider">
                  <Truck size={16} className="text-blue-600" /> Shipping Address
                </h3>
                <div className="text-sm space-y-1 text-gray-600">
                  <p className="font-bold text-black text-base">{order.customerName}</p>
                  <p className="flex items-center gap-2"><Phone size={14} /> {order.phoneNumber}</p>
                  <p className="flex items-start gap-2 leading-relaxed italic">
                    <Home size={14} className="mt-1 flex-shrink-0" /> 
                    {order.address}
                  </p>
                  {order.notes && (
                    <div className="mt-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100 text-[12px]">
                      <span className="font-bold text-yellow-800 block mb-1">Note:</span>
                      "{order.notes}"
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-800 flex items-center gap-2 border-b pb-2 uppercase text-xs tracking-wider">
                  <Package size={16} className="text-blue-600" /> Order Summary
                </h3>
                <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                   {order.items.map((item: any, index: number) => (
                     <div key={index} className="flex justify-between text-sm items-center bg-gray-50 p-2 rounded-lg border border-gray-100">
                        <span className="text-gray-600 line-clamp-1 flex-1">
                          {item.name} <span className="font-bold text-black ml-1">x{item.quantity}</span>
                        </span>
                        <span className="font-bold text-zinc-800">৳{item.price * item.quantity}</span>
                     </div>
                   ))}
                </div>
                
                <div className="pt-4 border-t border-dashed space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>৳{order.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery Fee</span>
                    <span>৳{order.deliveryCharge}</span>
                  </div>
                  <div className="flex justify-between font-black text-2xl text-green-600 pt-2 border-t">
                    <span>TOTAL</span>
                    <span>৳{order.totalAmount}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/" 
                className="flex-1 bg-black text-white text-center py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-black/10"
              >
                <ShoppingBag size={18} /> CONTINUE SHOPPING
              </Link>
              {/* আপনি চাইলে এখানে প্রিন্ট বাটনটি আবার যোগ করতে পারেন */}
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-[10px] uppercase tracking-[0.3em]">Wear Bemen to be Men</p>
      </div>
    </main>
  );
}
'use client';

import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CheckoutClient({ initialRates }: { initialRates: any }) {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const [deliveryCharge, setDeliveryCharge] = useState(initialRates.insideDhaka);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + deliveryCharge;

  if (!mounted) return <div className="min-h-screen bg-gray-50" />; // Loading state

  if (cart.length === 0) {
    return (
      <main className="container mx-auto py-20 flex flex-col items-center text-center px-4">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <ShoppingCart size={80} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Your shopping bag is empty!</h2>
        <Link href="/shop/all" className="bg-blue-600 text-white px-8 py-3 rounded-lg flex items-center gap-2">
          <ArrowLeft size={18} /> Continue Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-10 mt-16 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-800 mb-6 border-b pb-4 uppercase tracking-wide">Shipping Information</h2>
          <div className="space-y-4">
            <input type="text" placeholder="Full Name *" className="w-full border p-3 rounded-xl outline-none focus:border-black transition-all" />
            <input type="text" placeholder="Mobile Number *" className="w-full border p-3 rounded-xl outline-none focus:border-black transition-all" />
            <input type="text" placeholder="Full Address *" className="w-full border p-3 rounded-xl outline-none focus:border-black transition-all" />
            <textarea placeholder="Order Notes (Optional)" className="w-full border p-3 rounded-xl h-24 outline-none focus:border-black transition-all"></textarea>

            <div className="pt-4 space-y-3">
              <p className="font-bold text-sm text-gray-500 uppercase tracking-widest">Select Area</p>
              
              <div 
                onClick={() => setDeliveryCharge(initialRates.insideDhaka)}
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${deliveryCharge === initialRates.insideDhaka ? 'border-green-500 bg-green-50' : 'border-gray-100'}`}
              >
                <span className="font-bold">Inside Dhaka</span>
                <span className="font-black text-green-700">৳ {initialRates.insideDhaka}</span>
              </div>

              <div 
                onClick={() => setDeliveryCharge(initialRates.outsideDhaka)}
                className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition-all ${deliveryCharge === initialRates.outsideRates ? 'border-blue-500 bg-blue-50' : 'border-gray-100'}`}
              >
                <span className="font-bold">Outside Dhaka</span>
                <span className="font-black text-blue-700">৳ {initialRates.outsideDhaka}</span>
              </div>
            </div>

            <button className="w-full bg-black hover:bg-zinc-800 text-white font-bold py-5 rounded-xl text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-6 shadow-xl shadow-black/10">
              <Zap size={20} fill="white" /> CONFIRM ORDER
            </button>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
          <h3 className="font-bold text-lg mb-6 border-b pb-4 flex items-center justify-between uppercase tracking-wide">
            Your Order
            <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">{cart.length} Items</span>
          </h3>
          
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {cart.map((item) => (
              <div key={item._id} className="flex gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                <div className="relative w-16 h-20 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover rounded-lg" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                    <p className="font-black text-blue-600">৳ {item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center bg-white border rounded-lg overflow-hidden">
                      <button onClick={() => updateQuantity(item._id, 'minus')} className="px-2 py-1 hover:bg-gray-100 transition-colors"><Minus size={12} /></button>
                      <span className="px-3 font-bold text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, 'plus')} className="px-2 py-1 hover:bg-gray-100 transition-colors"><Plus size={12} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-4 border-t pt-6">
            <div className="flex justify-between text-gray-500 font-medium italic">
              <span>Subtotal</span>
              <span className="font-bold text-gray-800">৳ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-500 font-medium italic">
              <span>Delivery Fee</span>
              <span className="font-bold text-gray-800">৳ {deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-black text-2xl text-green-600 pt-4 border-t border-dashed border-gray-300">
              <span>Grand Total</span>
              <span>৳ {total.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
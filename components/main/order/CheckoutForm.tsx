"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, Trash2, Plus, Minus, Zap, Loader2, User, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/orderAction";

export default function CheckoutForm({ initialRates }: { initialRates: any }) {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [deliveryCharge, setDeliveryCharge] = useState(initialRates.insideDhaka);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    altPhone: "",
    address: "",
    city: "",
    notes: ""
  });

  const [errors, setErrors] = useState({ 
    phone: false, 
    name: false, 
    address: false, 
    city: false 
  });

  useEffect(() => { setMounted(true); }, []);

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal + deliveryCharge;

  // area change hole charge update hobe
  const handleAreaChange = (e: any) => {
    const selectedCity = e.target.value;
    setFormData({ ...formData, city: selectedCity });
    if (selectedCity === "Dhaka") {
      setDeliveryCharge(initialRates.insideDhaka);
    } else {
      setDeliveryCharge(initialRates.outsideDhaka);
    }
  };

  const handleConfirmOrder = async () => {
    const isPhoneValid = /^[0-9]{11}$/.test(formData.phone);
    const isNameValid = formData.name.trim().length > 0;
    const isAddressValid = formData.address.trim().length > 0;
    const isCityValid = formData.city.length > 0;

    setErrors({
      phone: !isPhoneValid,
      name: !isNameValid,
      address: !isAddressValid,
      city: !isCityValid
    });

    if (!isNameValid || !isAddressValid || !isCityValid) {
      return toast.error("Please fill all required fields!");
    }

    if (!isPhoneValid) {
      return toast.error("Mobile number must be exactly 11 digits!");
    }

    setLoading(true);

    const orderPayload = {
      customerName: formData.name,
      phoneNumber: formData.phone,
      altPhoneNumber: formData.altPhone,
      address: formData.address,
      city: formData.city,
      notes: formData.notes,
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size, // Size pathano holo
        image: item.image
      })),
      subtotal,
      deliveryCharge,
      totalAmount: total
    };

    try {
      const result = await createOrder(orderPayload);
      if (result.success) {
        toast.success("Order Placed Successfully!");
        clearCart();
        router.push(`/order-success/${result.orderId}`);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-gray-50" />;

  if (cart.length === 0) {
    return (
      <main className="container mx-auto py-20 flex flex-col items-center text-center px-4">
        <div className="bg-gray-100 p-8 rounded-full mb-6">
          <ShoppingCart size={80} className="text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Your shopping bag is empty!</h2>
        <Link href="/" className="bg-black text-white px-8 py-3 rounded-lg flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-10 py-10 bg-gray-50/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: Shipping Form (Design inspired by your image) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Contact Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
                <User size={20} className="text-gray-500" />
                <h2 className="font-bold uppercase tracking-tight">Contact Information</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Enter your full name" 
                  className={`w-full border p-3 rounded-xl outline-none transition-all ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-black'}`}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">Phone Number *</label>
                  <input 
                    type="tel" 
                    placeholder="01XXXXXXXXX" 
                    maxLength={11}
                    className={`w-full border p-3 rounded-xl outline-none transition-all ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-black'}`}
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">Alt. Phone (Optional)</label>
                  <input 
                    type="tel" 
                    placeholder="01XXXXXXXXX" 
                    className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-black transition-all"
                    onChange={(e) => setFormData({...formData, altPhone: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
                <MapPin size={20} className="text-gray-500" />
                <h2 className="font-bold uppercase tracking-tight">Shipping Address</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Detailed Address *</label>
                <input 
                  type="text" 
                  placeholder="House, Road, Area" 
                  className={`w-full border p-3 rounded-xl outline-none transition-all ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-black'}`}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">City / District *</label>
                <select 
                  className={`w-full border p-3 rounded-xl outline-none transition-all bg-white ${errors.city ? 'border-red-500' : 'border-gray-200'}`}
                  onChange={handleAreaChange}
                >
                  <option value="">Select City</option>
                  <option value="Dhaka">Inside Dhaka</option>
                  <option value="Outside">Outside Dhaka</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">Note for Delivery (Optional)</label>
                <textarea 
                  placeholder="Special instructions (optional)" 
                  className="w-full border border-gray-200 p-3 rounded-xl h-24 outline-none focus:border-black transition-all"
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>

          <button 
            onClick={handleConfirmOrder}
            disabled={loading}
            className="w-full bg-black hover:bg-zinc-800 text-white font-bold py-5 rounded-xl text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-xl disabled:bg-gray-400"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} fill="white" />} 
            {loading ? "PROCESSING..." : "CONFIRM ORDER"}
          </button>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-10">
            <h3 className="font-bold text-lg mb-6 border-b pb-4 flex items-center justify-between uppercase tracking-wide">
              Your Order
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500">{cart.length} Items</span>
            </h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div key={`${item._id}-${item.size}`} className="flex gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
                  <div className="relative w-16 h-20 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover rounded-lg" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] bg-black text-white px-2 rounded-full font-bold">SIZE: {item.size}</span>
                        <p className="font-black text-blue-600">৳ {item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center bg-white border rounded-lg overflow-hidden">
                        <button onClick={() => updateQuantity(item._id, item.size, 'minus')} className="px-2 py-1 hover:bg-gray-100 transition-colors"><Minus size={12} /></button>
                        <span className="px-3 font-bold text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, item.size, 'plus')} className="px-2 py-1 hover:bg-gray-100 transition-colors"><Plus size={12} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item._id, item.size)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 border-t pt-6">
              <div className="flex justify-between text-gray-500 font-medium text-sm">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-medium text-sm">
                <span>Delivery Fee ({formData.city === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka"})</span>
                <span className="font-bold text-gray-800">৳ {deliveryCharge}</span>
              </div>
              <div className="flex justify-between font-black text-2xl text-green-600 pt-4 border-t border-dashed border-gray-300">
                <span>Total</span>
                <span>৳ {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
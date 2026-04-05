"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  ShoppingCart,
  Zap,
  Loader2,
  User,
  MapPin,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createOrder } from "@/app/actions/orderAction";

export default function CheckoutForm({ initialRates }: { initialRates: any }) {
  const { cart, clearCart } = useCart();
  const [deliveryCharge, setDeliveryCharge] = useState(
    initialRates.insideDhaka
  );
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    altPhone: "",
    address: "",
    city: "",
    notes: "",
  });

  const [errors, setErrors] = useState({
    phone: false,
    name: false,
    address: false,
    city: false,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryCharge;

  const handleAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCity = e.target.value;
    setFormData({ ...formData, city: selectedCity });
    if (selectedCity === "Dhaka") {
      setDeliveryCharge(initialRates.insideDhaka);
    } else if (selectedCity === "Outside") {
      setDeliveryCharge(initialRates.outsideDhaka);
    }
  };

  const handleConfirmOrder = async () => {
    const isPhoneValid = /^[0-9]{11}$/.test(formData.phone);
    const isNameValid = formData.name.trim().length > 0;
    const isAddressValid = formData.address.trim().length > 0;
    const isCityValid = formData.city.length > 0;

    if (!isNameValid || !isAddressValid || !isCityValid) {
      setErrors({
        phone: !isPhoneValid,
        name: !isNameValid,
        address: !isAddressValid,
        city: !isCityValid,
      });
      return toast.error("Please fill all required fields!");
    }

    if (!isPhoneValid) {
      setErrors((prev) => ({ ...prev, phone: true }));
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
      items: cart.map((item) => ({
        _id: item._id,
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        image: item.image,
      })),
      subtotal,
      deliveryCharge,
      totalAmount: total,
    };

    try {
      const result = await createOrder(orderPayload);
      if (result.success) {
        toast.success("Order Placed Successfully!");
        clearCart();
        router.push(`/order-success/${result.orderId}`);
      } else {
        toast.error(result.message || "Failed to place order.");
      }
    } catch (err) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return <div className="min-h-screen bg-gray-50" />;

  // --- কার্ট খালি থাকলে এই অংশটি দেখাবে ---
  if (cart.length === 0) {
    return (
      <main className="min-h-[80vh] flex flex-col items-center justify-center px-4 bg-gray-50/30">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={48} className="text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-3 uppercase tracking-tight">
            Your Cart is Empty
          </h2>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            It looks like you haven&apos;t added any items to your cart yet.
            Browse our collection to find something you love!
          </p>
          <Link
            href="/shop/all"
            className="w-full bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-900 transition-all shadow-lg active:scale-95"
          >
            <ArrowLeft size={18} />
            BACK TO SHOPPING
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 md:px-10 py-10 bg-gray-50/30">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ল্যাপট সাইড: ফর্ম */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
              <User size={20} className="text-gray-500" />
              <h2 className="font-bold uppercase tracking-tight">
                Contact Information
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-500 mb-1 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className={`w-full border p-3 rounded-xl outline-none transition-all ${
                    errors.name
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200 focus:border-black"
                  }`}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    placeholder="017XXXXXXXX"
                    maxLength={11}
                    className={`w-full border p-3 rounded-xl outline-none transition-all ${
                      errors.phone
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-black"
                    }`}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        phone: e.target.value.replace(/\D/g, ""),
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 mb-1 block">
                    Alt. Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:border-black transition-all"
                    onChange={(e) =>
                      setFormData({ ...formData, altPhone: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-6 text-gray-800">
              <MapPin size={20} className="text-gray-500" />
              <h2 className="font-bold uppercase tracking-tight">
                Shipping Address
              </h2>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Address (House, Road, Area)"
                className={`w-full border p-3 rounded-xl outline-none transition-all ${
                  errors.address
                    ? "border-red-500"
                    : "border-gray-200 focus:border-black"
                }`}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />

              <select
                className={`w-full border p-3 rounded-xl bg-white outline-none transition-all ${
                  errors.city
                    ? "border-red-500"
                    : "border-gray-200 focus:border-black"
                }`}
                onChange={handleAreaChange}
                value={formData.city}
              >
                <option value="">Select City</option>
                <option value="Dhaka">Inside Dhaka</option>
                <option value="Outside">Outside Dhaka</option>
              </select>

              <textarea
                placeholder="Special instructions (optional)"
                className="w-full border border-gray-200 p-3 rounded-xl h-24 outline-none focus:border-black transition-all"
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
              ></textarea>
            </div>
          </div>

          <button
            onClick={handleConfirmOrder}
            disabled={loading}
            className="w-full bg-black text-white font-bold py-5 rounded-xl text-lg flex items-center justify-center gap-2 shadow-xl hover:bg-gray-900 transition-all disabled:bg-gray-400 disabled:shadow-none active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Zap size={20} fill="white" />
            )}
            {loading ? "PROCESSING..." : "CONFIRM ORDER"}
          </button>
        </div>

        {/* রাইট সাইড: অর্ডার সামারি */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-10">
            <h3 className="font-bold text-lg mb-6 border-b pb-4 flex items-center justify-between uppercase tracking-wide">
              Your Order
              <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-500 font-bold">
                {cart.length} Items
              </span>
            </h3>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {cart.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="flex gap-4 bg-gray-50/50 p-3 rounded-xl border border-gray-100"
                >
                  <div className="relative w-16 h-20 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-bold mb-1">
                      ID: {item.productId}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full font-bold">
                        SIZE: {item.size}
                      </span>
                      <p className="font-black text-black">৳ {item.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 space-y-4 border-t pt-6">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800">
                  ৳ {subtotal.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>
                  Delivery (
                  {formData.city === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka"}
                  )
                </span>
                <span className="font-bold text-gray-800">
                  ৳ {deliveryCharge}
                </span>
              </div>
              <div className="flex justify-between font-black text-2xl text-black pt-4 border-t border-dashed">
                <span>Total</span>
                <span className="text-black">৳ {total.toLocaleString()}</span>
              </div>
            </div>

            <p className="text-[10px] text-gray-400 mt-6 text-center font-medium uppercase tracking-widest">
              Secure Checkout • Cash on Delivery
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

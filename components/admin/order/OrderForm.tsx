"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createManualOrder, updateOrder } from "@/app/actions/orderAction";
import { Loader2, Plus, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface OrderFormProps {
    initialData?: any;
    isInitialDataLoading?: boolean;
}

export default function OrderForm({ initialData }: OrderFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        customerName: "",
        phoneNumber: "",
        altPhoneNumber: "",
        address: "",
        city: "Dhaka",
        notes: "",
        deliveryCharge: 60,
    });

    const [items, setItems] = useState<any[]>([
        { _id: new Date().getTime().toString(), productId: "", name: "", price: 0, quantity: 1, size: "", image: "" }
    ]);

    useEffect(() => {
        if (initialData) {
            setFormData({
                customerName: initialData.customerName || "",
                phoneNumber: initialData.phoneNumber || "",
                altPhoneNumber: initialData.altPhoneNumber || "",
                address: initialData.address || "",
                city: initialData.city || "Dhaka",
                notes: initialData.notes || "",
                deliveryCharge: initialData.deliveryCharge || 60,
            });
            if (initialData.items && initialData.items.length > 0) {
                setItems(initialData.items);
            }
        }
    }, [initialData]);

    const subtotal = items.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
    const totalAmount = subtotal + Number(formData.deliveryCharge);

    const addItem = () => {
        setItems([...items, { _id: new Date().getTime().toString(), productId: "", name: "", price: 0, quantity: 1, size: "", image: "" }]);
    };

    const removeItem = (index: number) => {
        if (items.length > 1) {
            const newItems = [...items];
            newItems.splice(index, 1);
            setItems(newItems);
        }
    };

    const updateItem = (index: number, field: string, value: any) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (items.some(i => !i.name || !i.productId || !i.size || i.price <= 0 || i.quantity <= 0)) {
            setError("Please fill all item details correctly.");
            setLoading(false);
            return;
        }

        const payload = {
            ...formData,
            items,
            subtotal,
            totalAmount
        };

        let res;
        if (initialData) {
            res = await updateOrder(initialData._id, payload);
        } else {
            res = await createManualOrder(payload);
        }

        if (res.success) {
            router.back();
            router.refresh();
        } else {
            setError(res.message);
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <Link
                href="/bemen-staff-portal/orders"
                className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors font-bold text-sm uppercase tracking-tight mb-6"
            >
                <ArrowLeft size={18} /> Back to Orders
            </Link>

            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <h1 className="text-2xl font-black mb-6">{initialData ? "Edit Order" : "Add Manual Order"}</h1>

                {error && <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 font-bold text-sm">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Customer Details */}
                    <div>
                        <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400 mb-4 border-b pb-2">Customer Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Customer Name *</label>
                                <input required type="text" className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-black" value={formData.customerName} onChange={e => setFormData({ ...formData, customerName: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                                <input required type="text" className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-black" value={formData.phoneNumber} onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Alt Phone Number</label>
                                <input type="text" className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-black" value={formData.altPhoneNumber} onChange={e => setFormData({ ...formData, altPhoneNumber: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">City *</label>
                                <select className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-black" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}>
                                    <option value="Dhaka">Inside Dhaka</option>
                                    <option value="Outside Dhaka">Outside Dhaka</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Delivery Address *</label>
                                <textarea required rows={2} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-black resize-none" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-bold text-gray-700 mb-1">Order Notes (Optional)</label>
                                <textarea rows={2} className="w-full border rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-black resize-none" value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Items */}
                    <div>
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400">Items Ordered *</h3>
                            <button type="button" onClick={addItem} className="text-xs flex items-center gap-1 font-bold bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800">
                                <Plus size={14} /> Add Item
                            </button>
                        </div>

                        <div className="space-y-4">
                            {items.map((item, idx) => (
                                <div key={idx} className="p-4 bg-gray-50 border border-gray-100 rounded-xl relative">
                                    {items.length > 1 && (
                                        <button type="button" onClick={() => removeItem(idx)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pr-8">
                                        <div className="md:col-span-4">
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Product Name</label>
                                            <input required type="text" className="w-full border rounded-md p-1.5 text-sm" value={item.name} onChange={e => updateItem(idx, "name", e.target.value)} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Product ID</label>
                                            <input required type="text" placeholder="e.g. BMN-101" className="w-full border rounded-md p-1.5 text-sm" value={item.productId} onChange={e => updateItem(idx, "productId", e.target.value)} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Size</label>
                                            <input required type="text" placeholder="e.g. XL" className="w-full border rounded-md p-1.5 text-sm" value={item.size} onChange={e => updateItem(idx, "size", e.target.value)} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Unit Price (৳)</label>
                                            <input required type="number" min="0" className="w-full border rounded-md p-1.5 text-sm" value={item.price || ""} onChange={e => updateItem(idx, "price", e.target.value)} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Quantity</label>
                                            <input required type="number" min="1" className="w-full border rounded-md p-1.5 text-sm" value={item.quantity || ""} onChange={e => updateItem(idx, "quantity", e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pricing Summary */}
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex gap-4 items-center w-full md:w-auto">
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-gray-500 mb-1">Delivery Charge (৳)</label>
                                <input type="number" className="w-24 border rounded-md p-1.5 text-sm" value={formData.deliveryCharge || ""} onChange={e => setFormData({ ...formData, deliveryCharge: Number(e.target.value) })} />
                            </div>
                            <div className="pt-4">
                                <p className="text-xs font-bold text-gray-500">Subtotal: ৳{subtotal}</p>
                            </div>
                        </div>
                        <div className="text-right w-full md:w-auto">
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none mb-1">Grand Total</p>
                            <p className="text-3xl font-black text-green-600">৳{totalAmount}</p>
                        </div>
                    </div>

                    <button disabled={loading} type="submit" className="w-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-all">
                        {loading && <Loader2 size={18} className="animate-spin" />}
                        {initialData ? "Save Changes" : "Create Manual Order"}
                    </button>
                </form>
            </div>
        </div>
    );
}

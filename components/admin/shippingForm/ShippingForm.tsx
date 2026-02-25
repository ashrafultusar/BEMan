"use client";
import { useState } from "react";
import { Save, Truck, Info } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { updateShippingCharges } from "@/app/actions/shipping";

export default function ShippingForm({ initialData }: { initialData: any }) {
  const [loading, setLoading] = useState(false);
  const [inside, setInside] = useState(initialData?.insideDhaka || 70);
  const [outside, setOutside] = useState(initialData?.outsideDhaka || 150);

  const handleSave = async () => {
    setLoading(true);
    const promise = updateShippingCharges({ insideDhaka: inside, outsideDhaka: outside });

    toast.promise(promise, {
      loading: 'Updating charges...',
      success: (res: any) => res.message || 'Updated successfully!',
      error: 'Could not update charges.',
    });

    try {
      await promise;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
      {/* Toast Configuration: Middle Position & Limit 1 */}
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
        containerStyle={{ top: 40 }}
        gutter={8}
      />

      {/* Hide Number Arrows CSS */}
      <style jsx global>{`
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
      `}</style>
      
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-blue-50 p-3 rounded-full">
          <Truck size={24} className="text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 tracking-tight">Configuration</h2>
      </div>

      <div className="space-y-6">
        {/* Inside Dhaka Input */}
        <div className="group">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Inside Dhaka</label>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-bold text-gray-400">Standard</span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">৳</span>
            <input 
              type="number" 
              value={inside} 
              onWheel={(e) => (e.target as HTMLInputElement).blur()}
              onChange={(e) => setInside(Number(e.target.value))}
              className="w-full border-2 border-gray-100 bg-gray-50/50 pl-8 pr-4 py-3.5 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-lg"
              placeholder="0"
            />
          </div>
        </div>

        {/* Outside Dhaka Input */}
        <div className="group">
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Outside Dhaka</label>
            <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full font-bold text-gray-400">National</span>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">৳</span>
            <input 
              type="number" 
              value={outside} 
              onWheel={(e) => (e.target as HTMLInputElement).blur()} 
              onChange={(e) => setOutside(Number(e.target.value))}
              className="w-full border-2 border-gray-100 bg-gray-50/50 pl-8 pr-4 py-3.5 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-all font-black text-lg"
              placeholder="0"
            />
          </div>
        </div>

        {/* Warning Note */}
        <div className="flex items-start gap-2 p-4 bg-orange-50 rounded-xl border border-orange-100">
          <Info size={18} className="text-orange-500 shrink-0 mt-0.5" />
          <p className="text-xs text-orange-700 leading-relaxed">
            Changing these values will immediately affect all customer checkouts. Please double-check before saving.
          </p>
        </div>

        {/* Save Button */}
        <button 
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all active:scale-[0.98] disabled:bg-gray-300 shadow-xl shadow-black/10 mt-4"
        >
          <Save size={20} className={loading ? "animate-spin" : ""} />
          {loading ? "SAVING CHANGES..." : "SAVE DELIVERY CHARGES"}
        </button>
      </div>
    </div>
  );
}
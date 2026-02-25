
import ShippingForm from "@/components/admin/shippingForm/ShippingForm";
import { getShippingCharges } from "@/lib/data/shipping";
import { Settings2 } from "lucide-react";

export default async function DeliveryChargePage() {
  const initialData = await getShippingCharges();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-black p-2 rounded-lg">
            <Settings2 className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Settings</h1>
            <p className="text-sm text-gray-500">Manage your store delivery fees and logistics</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Side: Instructions */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-gray-800 mb-2">Shipping Rates</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Set the standard delivery charges for your customers. These rates will be automatically applied at the checkout page based on the location selected by the user.
            </p>
            <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-700">
              <strong>Tip:</strong> Keep rates competitive to reduce cart abandonment.
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="md:col-span-2">
            <ShippingForm initialData={initialData} />
          </div>
        </div>
      </div>
    </div>
  );
}
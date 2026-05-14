import OrderForm from "@/components/admin/order/OrderForm";
import { getOrderById } from "@/lib/data/order";
import { notFound } from "next/navigation";

export default async function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const response = await getOrderById(id);

    if (!response.success || !response.data) {
        notFound();
    }

    // To plain object if mongoose model instance
    const orderData = JSON.parse(JSON.stringify(response.data));

    return (
        <div className="bg-[#f9f7f5] min-h-screen">
            <OrderForm initialData={orderData} />
        </div>
    );
}

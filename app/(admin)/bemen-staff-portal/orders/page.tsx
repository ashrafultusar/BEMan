import OrderTable from "@/components/admin/order/OrderTable";
import { getAllOrders } from "@/lib/data/order";

export default async function OrdersPage() {
  const response = await getAllOrders();
  const orders = response.data || [];


  return <OrderTable initialOrders={orders} />;
}
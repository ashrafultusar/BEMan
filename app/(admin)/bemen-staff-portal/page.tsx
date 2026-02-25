import Dashboard from "@/components/admin/dashboard/Dashboard";
import { getDashboardData } from "@/lib/data/dashboard";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const result = await getDashboardData();
  
  if (!result.success) {
    return <div className="p-10 text-red-500">Failed to load dashboard.</div>;
  }

  return <Dashboard data={result.data} />;
}
import { auth } from "@/auth";
import Sidebar from "@/components/admin/Sidebar/Sidebar";
import { redirect } from "next/navigation";


const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

 if (!session?.user) {
    redirect("/login");
  }

const isAdmin = session.user.role === "admin" || session.user.role === "moderator";

if (!isAdmin) {
  redirect("/"); 
}
  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-8">
        
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
import Sidebar from "@/components/admin/Sidebar/Sidebar";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
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
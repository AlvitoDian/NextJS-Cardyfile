import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      <Navbar isDashboard={true} />

      {/* Content */}
      <main className="min-h-screen flex-1 p-6 ">{children}</main>
    </div>
  );
}

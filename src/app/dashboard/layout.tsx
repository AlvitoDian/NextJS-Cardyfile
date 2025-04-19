import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      <Navbar isDashboard={true} />

      {/* Content */}
      <main className="min-h-screen flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
}

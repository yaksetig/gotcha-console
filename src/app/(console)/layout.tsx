import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { ApplicationProvider } from "@/contexts/ApplicationContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApplicationProvider>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 p-2">
          <div className="bg-white rounded-3xl shadow-sm h-[calc(100vh-1rem)] flex flex-col">
            <Topbar />
            <main className="flex-1 overflow-auto p-8">{children}</main>
          </div>
        </div>
      </div>
    </ApplicationProvider>
  );
}

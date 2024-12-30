import Sidebar from "@/components/sidebar/Sidebar";
import Topbar from "@/components/topbar/Topbar";
import { getApplications } from "@/lib/server/console";
import { getAccessToken } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";
import { redirect } from "next/navigation";

const ApplicationProvider = dynamic(
  () => import("@/contexts/ApplicationContext"),
  { ssr: false },
);

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { appId: string };
}) {
  const tokenRes = await getAccessToken();
  const apps = await getApplications(tokenRes.accessToken!!);
  if (apps.length === 0 || !apps.some((a) => a.id === params.appId)) {
    return redirect("/console");
  }

  return (
    <div className="flex h-screen">
      <Sidebar appId={params.appId} />

      <div className="flex-1 p-2">
        <div className="bg-white rounded-3xl shadow-sm h-[calc(100vh-1rem)] flex flex-col">
          <Topbar />
          <main className="flex-1 overflow-auto p-8 shadow-md">{children}</main>
        </div>
      </div>
    </div>
  );
}

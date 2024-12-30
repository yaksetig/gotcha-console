import { createApplication, getApplications } from "@/lib/server/console";
import ApplicationCard from "@/components/console/ApplicationCard";
import { getAccessToken } from "@auth0/nextjs-auth0";

export const dynamic = "force-dynamic";

export default async function ConsolePage() {
  const tokenRes = await getAccessToken();
  const apps = await getApplications(tokenRes.accessToken!!);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Applications</h2>
        <form action={createApplication}>
          <input
            type="submit"
            value="New Application"
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-md"
          />
        </form>
      </div>

      <div className="space-y-4">
        {apps.map((app) => (
          <ApplicationCard key={app.id} app={app} />
        ))}
      </div>
    </>
  );
}

import { createApplication, getApplications } from "@/lib/server/console";
import ApplicationCard from "@/components/console/ApplicationCard";
import { getAccessToken } from "@auth0/nextjs-auth0";
import { PlusIcon } from "@heroicons/react/24/outline";

export const dynamic = "force-dynamic";

export default async function ConsolePage() {
  const tokenRes = await getAccessToken();
  const apps = await getApplications(tokenRes.accessToken!!);

  async function handleSubmit(form: FormData) {
    "use server";
    await createApplication((form.get("name") as string | null) ?? undefined);
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Applications</h2>
        <form action={handleSubmit}>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            New Application
          </button>
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

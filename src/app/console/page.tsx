import { getApplications, createApplication } from "@/lib/server/console";
import { redirect } from "next/navigation";
import { RocketLaunchIcon } from "@heroicons/react/24/outline";
import { getAccessToken } from "@auth0/nextjs-auth0";

export default async function WelcomeConsolePage() {
  const tokenRes = await getAccessToken();
  const appsList = await getApplications(tokenRes.accessToken!!);
  if (appsList.length > 0) {
    redirect(`/console/${appsList[0].id}`);
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <RocketLaunchIcon className="h-16 w-16 text-blue-500 mx-auto" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Gotcha Console!
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          Get started by creating your first application. You'll be able to
          manage your API keys, monitor usage, and configure your integration
          all in one place.
        </p>

        <form action={createApplication}>
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-colors duration-200"
          >
            Create Your First Application
          </button>
        </form>

        <div className="mt-12 text-sm text-gray-500">
          <p>
            Need help getting started?{" "}
            <a
              href="/docs"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Check our documentation →
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

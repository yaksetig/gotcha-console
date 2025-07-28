import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { ApplicationSelector } from "./ApplicationSelector";
import { getApplications } from "@/lib/server/console";
import MenuButton from "./MenuButton";

export default async function Topbar() {
  const [tokenRes, session] = await Promise.all([
    getAccessToken(),
    getSession(),
  ]);
  const appsList = await getApplications(tokenRes.accessToken!!);

  return (
    <header className="px-4 h-16 flex items-center justify-between border-b border-gray-700 flex-shrink-0">
      <div className="flex items-center text-gray-300">
        <MenuButton />
        <ApplicationSelector appsList={appsList} />
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-gray-300 hover:text-white">
          {session?.user?.name}
        </span>
        <a
          href="/api/auth/logout"
          className="text-gray-300 hover:text-white"
        >
          Logout
        </a>
      </div>
    </header>
  );
}

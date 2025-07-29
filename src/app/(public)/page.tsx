import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";
import ProfileClient from "@/components/ProfileClient";

export default async function Home() {
  const session = await getSession();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-16">
      <main className="text-center space-y-6">
        <Image
          src="/logo.svg"
          alt="Gotcha logo"
          width={64}
          height={64}
          className="mx-auto"
        />
        <h1 className="text-5xl font-bold text-gray-900 dark:text-gray-100">Welcome to Gotcha</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Secure your applications with challenge-based authentication.
        </p>
        <div className="flex justify-center gap-4">
          {session ? (
            <>
              <a
                href="/console"
                className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Continue
              </a>
              <a
                href="/api/auth/logout"
                className="px-6 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                Logout
              </a>
            </>
          ) : (
            <a
              href="/api/auth/login?returnTo=%2Fconsole"
              className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Get Started
            </a>
          )}
        </div>
        {session && (
          <div className="pt-8">
            <ProfileClient />
          </div>
        )}
      </main>
    </div>
  );
}

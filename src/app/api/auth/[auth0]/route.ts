import { handleAuth, handleLogout } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

export const GET = handleAuth({
  logout: handleLogout({
    returnTo: "/api/redirect-to-console",
  }),
});

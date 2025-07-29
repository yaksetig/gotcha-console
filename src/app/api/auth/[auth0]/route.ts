import { handleAuth, handleLogout } from "@auth0/nextjs-auth0";
import { AUTH0_BASE_URL } from "@/lib/server/env";

export const GET = handleAuth({
  logout: handleLogout({
    returnTo: AUTH0_BASE_URL,
  }),
});

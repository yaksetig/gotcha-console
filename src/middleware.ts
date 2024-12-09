import { withMiddlewareAuthRequired } from "@auth0/nextjs-auth0/edge";
import { NextRequest } from "next/server";

export default withMiddlewareAuthRequired({
  returnTo: async (req: NextRequest) => {
    return req.nextUrl.pathname;
  },
});

export const config = {
  matcher: "/console/:path*",
};

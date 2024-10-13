import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function middleware(req: NextRequest, res: NextResponse) {
  const token = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const isAuthenticated = token ? true : false;
  const pathSegments = req.nextUrl.pathname.split("/");

  if (
    !isAuthenticated &&
    (pathSegments[1] == "home" ||
      pathSegments[1] == "builder" ||
      pathSegments[1] == "spaces")
  ) {
    const loginPath = `/auth`;
    const loginURL = new URL(loginPath, req.nextUrl.origin);
    return NextResponse.redirect(loginURL.toString());
  }
  if (isAuthenticated && pathSegments[1] == "auth") {
    const newURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(newURL.toString());
  }

  // Allow requests from your frontend origin
  const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"]; // Added the new origin

  const origin = req.headers.get("origin");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
        "Access-Control-Allow-Methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  // Handle actual requests
  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }

  return response;

  // return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // Apply middleware to all API routes
};

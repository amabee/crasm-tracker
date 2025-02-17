import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Redirect authenticated users away from auth pages
    if (path.startsWith("/auth/") && token) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Role-based route protection
    if (path.startsWith("/admin") && token?.role !== "Admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (path.startsWith("/regional-director") && token?.role !== "RD") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (path.startsWith("/oiccao") && token?.role !== "OIC/CAO") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (path.startsWith("/provincial") && token?.role !== "Provincial") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (path.startsWith("/cashier") && token?.role !== "Collecting Officer") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/regional-director/:path*",
    "/oiccao/:path*",
    "/provincial/:path*",
    "/cashier/:path*",
    "/",
  ],
};

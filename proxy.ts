import { NextResponse } from "next/server";

export function proxy(request: Request) {
  // For now, let the admin layout handle authentication
  // This middleware can be enhanced later with better-auth middleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
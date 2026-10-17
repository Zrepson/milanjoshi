import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const historyHost = "history.milanjoshi.com.np";

export function proxy(request: NextRequest) {
  if (request.nextUrl.hostname === historyHost && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/history", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

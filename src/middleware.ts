import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const signedinPages = ["/"];

export default function middleware(req: NextRequest) {
  const response = NextResponse.next();

  if (req.nextUrl.pathname === "/logout") {
    console.log("hr**************: ", req.cookies.entries());

    req.cookies.delete("ACCESS_TOKEN");
    req.cookies.clear();
    return NextResponse.rewrite(new URL("/auth/login", req.url));
  }

  console.log("here: ", response.cookies.clear());

  const token = req.cookies.get("ACCESS_TOKEN");
  console.log("token: ", token);

  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.get("ACCESS_TOKEN");

    if (!token) {
      return NextResponse.rewrite(new URL("/auth/login", req.url));
    }
  }
}

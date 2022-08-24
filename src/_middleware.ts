import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const signedinPages = ["/"];

export default function middleware(req: NextRequest) {
  console.log("cookies: ", req);
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    //@ts-ignore
    const token = req.cookies.ACCESS_TOKEN;

    if (!token) {
      return NextResponse.redirect("/auth/login");
    }
  }
}

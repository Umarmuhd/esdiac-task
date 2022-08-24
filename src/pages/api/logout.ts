// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("ACCESS_TOKEN", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/api/",
    })
  );
  res.status(200).json({ success: true, message: "Logout successful!" });
}

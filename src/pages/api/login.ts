import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/index";
import { comparePassword } from "../../utils/passwordUtils";

const login = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone_number, password } = req.body;

  console.log("phone_number: ", phone_number);

  const user = await prisma.user.findUnique({
    where: {
      phone_number: Number(phone_number).toString(),
    },
  });

  if (!user) {
    res.status(401);
    res.json({ success: false, message: "Phone number or Password is wrong" });
    return;
  }

  const isValid = await comparePassword(user?.password as string, password);

  if (user && isValid) {
    const token = jwt.sign(
      {
        id: user.id,
        phone_number: user.phone_number,
        time: Date.now(),
      },
      "SomethingSecret",
      {
        expiresIn: "1h",
      }
    );

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );

    res
      .status(200)
      .json({ success: true, data: user, message: "Login successful!" });
  } else {
    res.status(401);
    res.json({ success: false, message: "Invalid login credentials." });
  }
};

export default login;

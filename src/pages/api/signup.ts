import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/index";
import { hashPassword } from "../../utils/passwordUtils";

const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, password, first_name, last_name, phone_number, country_code } =
    req.body;

  let user;

  const hashedPassword = await hashPassword(password);

  try {
    user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        first_name,
        last_name,
        phone_number: Number(phone_number).toString(),
        country_code,
      },
    });
  } catch (e) {
    console.log(e);

    res.status(401);
    res.json({ success: false, message: "User already exists" });
    return;
  }

  const token = jwt.sign(
    {
      phone_number: user.phone_number,
      id: user.id,
      time: Date.now(),
    },
    "SomethingSecret",
    { expiresIn: "1h" }
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

  res.status(200).json({ success: true, data: user });
};

export default signup;

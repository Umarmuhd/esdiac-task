import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/index";

//@ts-ignore
export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.ACCESS_TOKEN;

    if (token) {
      let user;

      try {
        //@ts-ignore
        const { id } = jwt.verify(token, "SomethingSecret");
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("Not real user");
        }
      } catch (error) {
        res.status(401);
        res.json({ success: false, message: "Not Authorized!" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "Not Authorizied" });
  };
};

//@ts-ignore
export const validateToken = (token) => {
  const user = jwt.verify(token, "hello");
  return user;
};

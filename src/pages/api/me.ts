import { validateRoute } from "../../middleware/validateRoute";
import { NextApiRequest, NextApiResponse } from "next";

const me = async (req: NextApiRequest, res: NextApiResponse, user: any) => {
  res.status(200).json({ success: true, data: user });
};
export default validateRoute(me);

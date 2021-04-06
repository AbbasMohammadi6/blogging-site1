import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import User, { IUser } from "models/userModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body: { email, password },
  } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      if (!email || !password)
        return res
          .status(400)
          .json({ message: "Email and password are required" });

      try {
        const user: IUser = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (!(await user.checkPassword(password)))
          return res.status(401).json({ message: "Unable to login" });

        return res.json({
          user,
          token: user.generateToken(),
        });
      } catch (e) {
        res.status(500).json({ message: "Server problem, try again later" });
      }

      break;

    default:
      res.status(404).json({ message: "Endpoint not found" });
  }
};

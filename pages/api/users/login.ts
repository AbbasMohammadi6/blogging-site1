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
          .json({ message: "وارد کردن ایمیل و رمز الزامی است." });

      try {
        const user: IUser = await User.findOne({ email });

        if (!user)
          return res.status(404).json({ message: "ایمیل یا رمز اشتباه است." });

        if (!(await user.checkPassword(password)))
          return res.status(401).json({ message: "ایمیل یا رمز اشتباه است." });

        return res.json({
          user,
          token: user.generateToken(),
        });
      } catch (e) {
        res
          .status(500)
          .json({
            message:
              "متأسفانه مشکلی در سمت سرور ایجاد شدهی است. لطفاً دوباره اطلاعات را ارسال کنید.",
          });
      }

      break;

    default:
      res.status(404).json({ message: "Endpoint not found" });
  }
};

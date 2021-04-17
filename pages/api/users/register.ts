import User, { IUser } from "models/userModel";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		body: { name, email, password },
	} = req;

	await dbConnect();

	switch (method) {
		case "POST":
			if (!name || !email || !password)
				return res
					.status(400)
					.json({ message: "وارد کردن نام، ایمیل و رمز الزامی است." });

			try {
				if (await User.findOne({ email }))
					return res
						.status(400)
						.json({ message: "این ایمیل قبلاً استفاده شده است." });

				const user = await User.create({ name, email, password });

				return res.status(201).json({ user, token: user.generateToken() });
			} catch (e) {
				console.log(e);
				return res.status(400).json(e);
			}

		default:
			res.status(404).json({ message: "Not found..." });
	}
};

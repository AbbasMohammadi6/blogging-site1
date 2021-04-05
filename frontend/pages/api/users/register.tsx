import User, { IUser } from "models/userModel";
import { NextApiRequest, NextApiResponse } from "next/";
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
					.json({ message: "name, email and password are required" });

			try {
				if (await User.findOne({ email }))
					return res.status(400).json({ message: "Email aleady exists" });

				const user = await User.create({ name, email, password });

				const userWithoutPassword = { name: user.name, email: user.email };

				return res
					.status(201)
					.json({ user: userWithoutPassword, token: user.generateToken() });
			} catch (e) {
				console.log(e);
				return res.status(400).json(e);
			}

		default:
			res.status(404).json({ message: "Not found..." });
	}
};

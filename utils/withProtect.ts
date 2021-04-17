import { NextApiResponse, NextApiRequest } from "next";
import jwt from "jsonwebtoken";
import dbConnect from "utils/dbConnect";
import User, { IUser } from "models/userModel";

const withProtect = (handler) => {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		await dbConnect();

		if (
			!req.headers.authorization ||
			!req.headers.authorization.startsWith("Bearer")
		)
			return res.status(400).json({ message: "Access denied, No token." });

		const token = req.headers.authorization.split(" ")[1];
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

		try {
			const user = await User.findById(decoded.id);
			if (!user) return res.status(404).json({ message: "User doesn't exits" });

			handler(req, res, user);
		} catch (e) {
			return res.status(500).json({ message: "Server error, try again later" });
		}
	};
};

export default withProtect;

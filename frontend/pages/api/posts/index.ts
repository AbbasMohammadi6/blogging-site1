import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import Post, { IPost } from "models/postModel";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { method } = req;
	await dbConnect();

	switch (method) {
		case "GET":
			try {
				const posts = await Post.find({});

				return res.json(posts);
			} catch (error) {
				return res
					.status(500)
					.json({ message: "Server error, try again later" });
			}
			break;

		default:
			res.status(404).json({ message: "Endpoint doesn't exists" });
			break;
	}
};

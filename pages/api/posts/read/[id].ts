import { NextApiRequest, NextApiResponse } from "next";
import Post, { IPost } from "models/postModel";
import dbConnect from "utils/dbConnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { id },
	} = req;

	await dbConnect();

	switch (method) {
		case "GET":
			try {
				const post = await Post.findById(id);
				if (!post) res.status(404).json({ message: "Post not found" });
				else res.json(post);
			} catch (error) {
				res.status(500).json({ message: "Server error, try again later." });
			}
			break;

		default:
			res.status(404).json({ message: "Api endpoint doesn't exist" });
			break;
	}
};

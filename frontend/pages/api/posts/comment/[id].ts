import { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Post, { IPost } from "models/postModel";
import { IUser } from "models/userModel";
import withProtect from "utils/withProtect";
import dbConnect from "utils/dbConnect";

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse,
	user: IUser
) => {
	const {
		method,
		body: { text },
		query: { id },
	} = req;

	switch (method) {
		case "POST":
			await dbConnect();

			if (!text)
				return res.status(400).json({ message: "comment's text is required" });

			if (!mongoose.Types.ObjectId.isValid)
				return res.status(400).json({ message: "id is not valid" });

			try {
				const post: IPost = await Post.findById(id);

				if (!post)
					return res.status(404).json({ message: "Post doesn't exist" });

				post.comments.push({
					text,
					owner: user._id,
				});

				const commentedPost: IPost = await post.save();

				return res.status(201).json(commentedPost);
			} catch (e) {
				return res
					.status(500)
					.json({ message: "Server error, try again later" });
			}

		default:
			res.status(404).json({ message: "Endpoint doesn't exist" });
	}
};

export default withProtect(handler);

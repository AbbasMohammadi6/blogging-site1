import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import Post, { IPost } from "models/postModel";
import { IUser } from "models/userModel";
import withProtect from "utils/withProtect";

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse,
	user: IUser
) => {
	const {
		method,
		body: { title, body },
	} = req;

	await dbConnect();

	switch (method) {
		case "POST":
			if (!title || !body)
				return res.status(400).json({ message: "title and body are required" });

			try {
				const post: IPost = await Post.create({ title, body, owner: user._id });
				user.posts.push(post._id);
				await user.save();

				return res.status(201).json(post);
			} catch (e) {
				return res
					.status(500)
					.json({ message: "Server error, try again later" });
			}

			break;

		default:
			res.status(404).json({ message: "The endpoint doesn't exist" });
			break;
	}
};

export default withProtect(handler);

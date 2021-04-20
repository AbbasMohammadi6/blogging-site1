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
		body: { text, id },
		// query: { id },
	} = req;

	switch (method) {
		case "POST":
			await dbConnect();

			if (!text)
				return res.status(400).json({ message: "متن کامنت خالی است." });

			if (!mongoose.Types.ObjectId.isValid(id as string))
				return res.status(400).json({ message: "id is not valid" });

			console.log("HERE", id);

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
				console.log(e);
				return res.status(500).json({
					message: "مشکلی برای سرور رخ داده است، لطفاً دوباره امتحان کنید.",
				});
			}

		default:
			res.status(404).json({ message: "Endpoint doesn't exist" });
	}
};

export default withProtect(handler);

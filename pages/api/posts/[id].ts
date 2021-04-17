import { NextApiRequest, NextApiResponse } from "next";
import Post, { IPost } from "models/postModel";
import dbConnect from "utils/dbConnect";
import withProtect from "utils/withProtect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const {
		method,
		query: { id },
	} = req;

	await dbConnect();

	switch (method) {
		case "POST":
			try {
				// const post = await Post.create();
			} catch (error) {
				res.status(500);
			}
			break;

		default:
			res.status(404).json({ message: "Api endpoint doesn't exist" });
			break;
	}
};

export default withProtect(handler);

import Post, { IPost } from "../../models/postModel";
import dbConnect from "../../utils/dbConnect";
import { GetStaticPaths, GetStaticProps } from "next";
import htmr from "htmr";

export default function PostScreen({ body }: { body: string }) {
	return htmr(body);
}

export const getStaticPaths: GetStaticPaths = async () => {
	await dbConnect();
	const posts: IPost[] = await Post.find({});
	const paths = posts.map((post) => {
		return {
			params: {
				// I expected post._id to be a string but it was an object???
				id: post._id.toString(),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	await dbConnect();
	let post: IPost;
	try {
		post = await Post.findById(params.id as string);
	} catch (error) {
		/** Todo: show this error in the UI maybe??? **/
		console.log(error);
	}

	return {
		props: {
			body: post.body,
		},
	};
};

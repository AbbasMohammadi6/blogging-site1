import Post, { IPost } from "../../models/postModel";
import dbConnect from "../../utils/dbConnect";
import { GetStaticPaths, GetStaticProps } from "next";
import htmr from "htmr";

export default function PostScreen({ body }: { body: string }) {
	console.log(body);
	return htmr(body);
}

export const getStaticPaths: GetStaticPaths = async () => {
	await dbConnect();
	const posts: IPost[] = await Post.find({});
	const paths = posts.map((post) => {
		return {
			params: {
				id: post._id.toString(),
			},
		};
	});
	console.log(paths);
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
		console.log(error);
	}

	return {
		props: {
			body: post.body,
		},
	};
};

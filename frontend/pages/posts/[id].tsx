import { GetStaticPaths, GetStaticProps } from "next";
import htmr from "htmr";
import Post, { IPost } from "models/postModel";
import dbConnect from "utils/dbConnect";
import Header from "components/Header";
import { useAppSelector } from "utils/hooks";

export default function PostScreen({
	body,
	title,
}: {
	body: string;
	title: string;
}) {
	const {
		userInfo: { token, user },
	} = useAppSelector((state) => state.userRegister);

	console.log(user);

	return (
		<>
			<Header />
			<h1>{title}</h1>
			<div>{htmr(body)}</div>
		</>
	);
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
			title: post.title,
		},
	};
};

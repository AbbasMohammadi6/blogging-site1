import { FC } from "react";
import { GetStaticProps } from "next";
import dbConnect from "utils/dbConnect";
import Post, { IPost } from "models/postModel";

interface Props {
	posts: IPost[];
}

const Page: FC<Props> = ({ posts }) => {
	console.log(posts);

	return <>some thing</>;
};

export default Page;

export const getStaticProps: GetStaticProps = async () => {
	await dbConnect;
	const posts: IPost[] = await Post.find({});

	return {
		props: {
			posts,
		},
	};
};

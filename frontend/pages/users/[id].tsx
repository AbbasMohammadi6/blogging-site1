import { FC } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import User, { IUser } from "models/userModel";
import dbConnect from "utils/dbConnect";
import htmr from "htmr";
import { getFiftyWords } from "utils/helpers";
import Link from "next/link";
import Header from "components/Header";

interface Props {
	name: string;
	error?: any;
	posts: { title: string; body: string; _id: string }[];
}

const Page: FC<Props> = ({ name, posts, error }: Props) => {
	if (error) console.log(error);

	return (
		<>
			<Header />

			{error ? (
				<h1>{error}</h1>
			) : (
				<>
					{posts.map((post) => (
						<div key={post._id}>
							<Link href={`/posts/${post._id}`}>
								<a>
									<h1>{post.title}</h1>
								</a>
							</Link>
							<p>{htmr(getFiftyWords(post.body))}</p>
						</div>
					))}
				</>
			)}
		</>
	);
};

export default Page;

export const getStaticPaths: GetStaticPaths = async () => {
	await dbConnect();

	const users: IUser[] = await User.find({});

	const paths = users.map((user) => {
		return {
			params: {
				id: user._id.toString(),
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
	await dbConnect();

	try {
		const user = await User.findById(id)
			.populate("posts", "title body createdAt")
			.select("-password");

		return {
			props: {
				name: user.name,
				posts: user.posts.map((post) => {
					return {
						title: post.title,
						body: post.body,
						_id: post._id.toString(),
					};
				}),
			},
		};
	} catch (e) {
		return {
			props: {
				error: e.response.data,
			},
		};
	}
};

import { FC } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import User, { IUser } from "models/userModel";
import dbConnect from "utils/dbConnect";
import htmr from "htmr";
import { getFirstImgAndPar } from "utils/helpers";
import Link from "next/link";
import Header from "components/Header";
import Post, { IPost } from "models/postModel";
import Layout from "components/Layout";
import styles from "styles/userPage.module.scss";

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
			<Layout>
				{error ? (
					<h1>{error}</h1>
				) : (
					<div className={styles.main}>
						{posts.map((post) => (
							<div key={post._id} className={styles.card}>
								<Link href={`/posts/${post._id}`}>
									<a>
										<h1>{post.title}</h1>
									</a>
								</Link>

								<p>{htmr(getFirstImgAndPar(post.body))}</p>
							</div>
						))}
					</div>
				)}
			</Layout>
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
		const user = await User.findById(id).select("-password");

		const posts = await Post.find({ owner: id });

		return {
			props: {
				name: user.name,
				// done this to prevent the unserializable error
				posts: JSON.parse(JSON.stringify(posts)),
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

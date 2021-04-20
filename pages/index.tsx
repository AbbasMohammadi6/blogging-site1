import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import htmr from "htmr";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import Header from "components/Header";
import { createPost } from "slices/createPostSlice";
import { getPosts } from "slices/getPostsSlice";
import dbConnect from "utils/dbConnect";
import User from "models/userModel";
import Post, { IPost } from "models/postModel";
import { getFirstImgAndPar, convertDateToShamsi } from "utils/helpers";
import styles from "styles/homepage.module.scss";
import Layout from "components/Layout";
import Showcase from "components/Showcase";
import PopluarPosts from "components/PopluarPosts";

export default function Home({
	posts,
	error,
}: {
	posts: IPost[];
	error: string;
}) {
	const { isDark } = useAppSelector((state) => state.theme);

	return (
		<>
			<Header />
			<Layout>
				<Showcase />

				<main className={styles.main}>
					<section className={styles.newest}>
						{error ? (
							<h1>{error}</h1>
						) : (
							<>
								<h1>تازه‌ترین‌ها</h1>

								{posts.map((article, idx) => (
									<div className={styles.card} key={idx}>
										<h2>
											<Link href={`/posts/${article._id}`}>
												<a>{article.title}</a>
											</Link>
										</h2>

										<small>
											نویسنده: {/* @ts-ignore */}
											<Link href={`/users/${article.owner._id}`}>
												<a>{article.owner.name}</a>
											</Link>{" "}
											در {convertDateToShamsi(article.createdAt)}
										</small>

										<div className={styles.imgAndPar}>
											{htmr(getFirstImgAndPar(article.body))}
										</div>
									</div>
								))}
							</>
						)}
					</section>

					<aside className={styles.sidebar}>
						<PopluarPosts posts={posts} title="محبوب‌ترین‌ها" />
						<PopluarPosts posts={posts} title="پربحث‌ترین‌ها" />
					</aside>
				</main>
			</Layout>
		</>
	);
}

/** Todo: change this to server side rendering instead of static generation **/
export const getStaticProps: GetStaticProps = async () => {
	await dbConnect();

	try {
		// mongoose thrwos an error that says: Schema hasn't been registered for model "User".
		// so I make this request to make mongoose know about User model
		/** Todo: See if you could do this in another way **/
		const users = await User.find({});

		// by doing "name email", we are saying that we don't want the it to send the password
		const posts: IPost[] = await Post.find({})
			.populate("owner", "name email")
			.sort({ createdAt: -1 });

		// This seems to prevent the serializable error
		const newNewPosts = JSON.parse(JSON.stringify(posts));

		return {
			props: {
				posts: newNewPosts,
				error: "",
			},
		};
	} catch (e) {
		console.log(e);
		return {
			props: {
				posts: [],
				error: "Server error, try again later",
			},
		};
	}
};

import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import { GetStaticProps } from "next";
import htmr from "htmr";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import Header from "components/Header";
import { createPost } from "slices/createPostSlice";
import { getPosts } from "slices/getPostsSlice";
import dbConnect from "utils/dbConnect";
import Post, { IPost } from "models/postModel";

export default function Home({
	posts,
	error,
}: {
	posts: IPost[];
	error: string;
}) {
	return (
		<>
			<Header />

			<section>
				{posts.map((article, idx) => (
					<div key={idx}>
						<Link href={`/posts/${article._id}`}>
							<a>
								<h1>{article.title}</h1>
							</a>
						</Link>
						<div>{htmr(article.body)}</div>
					</div>
				))}
			</section>
		</>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	await dbConnect();

	try {
		const posts: IPost[] = await Post.find({});

		// If I send the posts array, nextjs will throw an error,
		// saying that it's not serializable

		const newPosts = posts.map((post) => {
			return {
				title: post.title,
				body: post.body,
				_id: post._id.toString(),
			};
		});

		return {
			props: {
				posts: newPosts,
				error: "",
			},
		};
	} catch (e) {
		return {
			props: {
				posts: [],
				error: "Server error, try again later",
			},
		};
	}
};

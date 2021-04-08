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
import Post, { IPost } from "models/postModel";
import { getFiftyWords } from "utils/helpers";

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
			{error ? (
				<h1>{error}</h1>
			) : (
				<section>
					{posts.map((article, idx) => (
						<div key={idx}>
							<Link href={`/posts/${article._id}`}>
								<a>
									<h1>{article.title}</h1>
								</a>
							</Link>

							<small>
								Written By: {/* @ts-ignore */}
								<Link href={`/users/${article.owner._id}`}>
									<a>{article.owner.name}</a>
								</Link>{" "}
								at {article.createdAt}
							</small>

							<div>{htmr(getFiftyWords(article.body))}</div>
						</div>
					))}
				</section>
			)}
		</>
	);
}

/** Todo: change this to server side rendering instead of static generation **/
export const getStaticProps: GetStaticProps = async () => {
	await dbConnect();

	try {
		// by doing "name email", we are saying that we don't want the it to send the password
		const posts: IPost[] = await Post.find({}).populate("owner", "name email");

		// If I send the posts array, nextjs will throw an error,
		// saying that it's not serializable

		const newPosts = posts.map((post) => {
			return {
				title: post.title,
				body: post.body,
				_id: post._id.toString(),
				createdAt: post.createdAt.toString().substring(4, 15),
				owner: {
					name: post.owner.name,
					// Do ts-ignore, because in the IPost interface _id is of type objectId, but here I poulated it with name and _id
					// @ts-ignore
					_id: post.owner._id.toString(),
				},
			};
		});

		return {
			props: {
				posts: newPosts,
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

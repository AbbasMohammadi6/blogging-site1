import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import htmr from "htmr";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import Header from "components/Header";
import { createPost } from "slices/createPostSlice";
import { getPosts } from "slices/getPostsSlice";

export default function Home() {
	const dispatch = useAppDispatch();

	const postsGet = useAppSelector((state) => state.postsGet);
	const { loading, error, data } = postsGet;

	useEffect(() => {
		dispatch(getPosts());
	}, [dispatch]);
	return (
		<>
			<Header />

			<section>
				{data.map((article) => (
					<>
						<h1>{article.title}</h1>

						<div>{htmr(article.body)}</div>
					</>
				))}
			</section>
		</>
	);
}

import { useEffect, useState, FormEvent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import htmr from "htmr";
import { useRouter } from "next/router";
import Link from "next/link";
import Post, { IPost } from "models/postModel";
import dbConnect from "utils/dbConnect";
import Header from "components/Header";
import { useAppSelector, useAppDispatch } from "utils/hooks";
import { addComment } from "slices/addCommentSlice";

interface Props {
	id: string;
	body: string;
	title: string;
	comments: {
		_id: string;
		text: string;
		createdAt: Date;
		owner: { _id: string; name: string };
	}[];
}

export default function PostScreen({ id, body, title, comments }: Props) {
	const [comment, setComment] = useState("");

	const router = useRouter();

	const dispatch = useAppDispatch();

	const {
		userInfo: { token, user },
	} = useAppSelector((state) => state.userRegister);

	const { loading, success, error } = useAppSelector(
		(state) => state.addComment
	);

	const postComment = (event: FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		dispatch(addComment({ text: comment, id }));
	};

	// This caused an infinite loop, fix it.
	// useEffect(() => {
	// 	router.reload();
	// }, [success]);

	return (
		<>
			<Header />
			<h1>{title}</h1>
			<div>{htmr(body)}</div>
			{user.name && (
				<form onSubmit={postComment}>
					{loading ? <h3>loading...</h3> : error && <h3>{error}</h3>}
					<textarea
						rows={5}
						cols={100}
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					></textarea>
					<button type="submit">Post</button>
				</form>
			)}

			<ul>
				{comments.map((comment) => (
					<li>
						<p>
							<Link href={`/users/${comment.owner._id}`}>
								<a>{comment.owner.name}</a>
							</Link>
						</p>

						<small>{comment.createdAt}</small>

						<p>{comment.text}</p>
					</li>
				))}
			</ul>
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
		post = await Post.findById(params.id as string)
			.populate("owner", "name _id")
			.populate("comments.owner", "name _id");
	} catch (error) {
		/** Todo: show this error in the UI maybe??? **/
		console.log(error);
	}

	return {
		props: {
			id: params.id,
			body: post.body,
			title: post.title,
			createdAt: post.createdAt.toString().substring(4, 15),
			comments: post.comments.map((comment) => {
				// console.log(comment);
				return {
					text: comment.text,
					_id: comment._id.toString(),
					createdAt: comment.createdAt.toString().substring(4, 15),
					owner: {
						name: comment.owner.name,
						_id: comment.owner._id.toString(),
					},
				};
			}),
		},
	};
};

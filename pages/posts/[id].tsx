import { useEffect, useState, FormEvent } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import htmr from "htmr";
import { useRouter } from "next/router";
import Link from "next/link";
import Post, { IPost } from "models/postModel";
import dbConnect from "utils/dbConnect";
import Header from "components/Header";
import { useAppSelector, useAppDispatch } from "utils/hooks";
import { addComment, reset as resetCommentError } from "slices/addCommentSlice";
import Layout from "components/Layout";
import styles from "styles/Post.module.scss";
import Modal from "components/Modal";
import LoaderSpinner from "components/LoaderSpinner";
import { convertDateToShamsi } from "utils/helpers";
import User from "models/userModel";

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

export default function PostScreen({ _id, body, title, comments }: Props) {
	const [comment, setComment] = useState("");

	const [modal, setModal] = useState<{ isOpen: boolean; message: string }>({
		isOpen: false,
		message: "",
	});

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

		if (!comment)
			return setModal({
				isOpen: true,
				message: "شما هنوز نظری وارد نکرده‌اید.",
			});

		dispatch(addComment({ text: comment, id: _id }));
	};

	const closeModal = () => {
		dispatch(resetCommentError());
		setModal({ isOpen: false, message: "" });
	};

	useEffect(() => {
		if (error) {
			setModal({ isOpen: true, message: error });
		}
	}, [error]);

	useEffect(() => {
		if (success) {
			router.reload();
			// reload to show the comment that was just added.
		}
	}, [success]);

	return (
		<>
			<Header />

			<Modal
				isOpen={modal.isOpen}
				closeModal={closeModal}
				message={modal.message}
			/>

			<Layout>
				<section className={styles.main}>
					<h1>{title}</h1>
					<div>{htmr(body)}</div>
				</section>

				{user.name && (
					<form onSubmit={postComment} className={styles.form}>
						<h3>ارسال نظرات</h3>

						<textarea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						></textarea>

						<button type="submit" disabled={loading}>
							ارسال {loading ? <LoaderSpinner /> : ""}
						</button>
					</form>
				)}

				<ul className={styles.comments}>
					{comments.map((comment, idx) => (
						<li key={idx}>
							<h4>
								<Link href={`/users/${comment.owner._id}`}>
									<a>{comment.owner.name}</a>
								</Link>
							</h4>

							<small>{convertDateToShamsi(comment.createdAt)}</small>

							<p>{comment.text}</p>
						</li>
					))}
				</ul>
			</Layout>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	try {
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
	} catch (e) {
		console.log(e);
	}
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	await dbConnect();

	let post: IPost;

	try {
		const users = await User.find({});

		post = await Post.findById(params.id as string)
			.populate("owner", "name _id")
			.populate("comments.owner", "name _id");
	} catch (error) {
		/** Todo: show this error in the UI maybe??? **/
		console.log(error);
	}

	return {
		props: JSON.parse(JSON.stringify(post)),
	};
};

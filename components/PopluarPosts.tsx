import Link from "next/link";
import htmr from "htmr";
import { IPost } from "models/postModel";
import styles from "styles/PopluarPosts.module.scss";
import { getFirstImg, convertDateToShamsi } from "utils/helpers";

const NewstPost = ({ posts, title }: { posts: IPost[]; title: string }) => {
	const firstFivePosts = posts.slice(0, 5);

	return (
		<div className={styles.main}>
			<h3>{title}</h3>

			<ul className={styles.list}>
				{firstFivePosts.map((post) => (
					<li key={post._id} className={styles.item}>
						<div className={styles.titleContainer}>
							<p>
								<Link href={`/posts/${post._id}`}>
									<a>{post.title}</a>
								</Link>{" "}
							</p>

							<small>
								نویسنده: {/* @ts-ignore */}
								<Link href={`/users/${post.owner._id}`}>
									<a>{post.owner.name}</a>
								</Link>{" "}
								در {convertDateToShamsi(post.createdAt)}
							</small>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default NewstPost;

import { useState, useEffect } from "react";
import Router from "next/router";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import {
	createPost,
	reset as resetCreatePostError,
} from "slices/createPostSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import Header from "components/Header";
import styles from "styles/createPost.module.scss";
import Layout from "components/Layout";
import Modal from "components/Modal";
import LoaderSpinner from "components/LoaderSpinner";

const addPost = () => {
	const [editorContent, setEditorContent] = useState("");
	const [title, setTitle] = useState("");
	const [modal, setModal] = useState<{ isOpen: boolean; message: string }>({
		isOpen: false,
		message: "",
	});

	const dispatch = useAppDispatch();

	const { loading, error, success } = useAppSelector(
		(state) => state.postCreate
	);

	const {
		userInfo: { token, user },
	} = useAppSelector((state) => state.userRegister);

	const handleImageUpload = (
		targetImgElement,
		index,
		state,
		imageInfo,
		remainingFilesCount
	): void => {
		console.log(targetImgElement, index, state, imageInfo, remainingFilesCount);
	};

	const handlePost = (): void => {
		if (!title)
			return setModal({
				isOpen: true,
				message: "عنوان پست را وارد نکرده‌اید.",
			});

		/** change this later, becuase now if user insters just one image, it gets posted, becuase the length will be more than 120 **/
		if (editorContent.length < 120)
			return setModal({ isOpen: true, message: "متن پست کمتر از حد مجاز است" });

		dispatch(createPost({ title, body: editorContent }));
	};

	const closeModal = () => {
		setModal({ isOpen: false, message: "" });
		dispatch(resetCreatePostError());
	};

	useEffect(() => {
		if (error) {
			setModal({ isOpen: true, message: error });
		}
	}, [error]);

	useEffect(() => {
		if (success) setModal({ isOpen: true, message: "پست با مؤفقیت ایجاد شد." });
	}, [success]);

	useEffect(() => {
		if (!user.name) Router.push("/");
	}, [user]);

	return (
		<>
			<Header />

			<Modal
				isOpen={modal.isOpen}
				closeModal={closeModal}
				message={modal.message}
			/>

			<Layout>
				<div className={styles.main}>
					<input
						type="text"
						placeholder="عنوان پست را اینجا وارد کنید..."
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>

					<SunEditor
						placeholder="Please type here..."
						setDefaultStyle="font-family: Shabnam; font-size: 1rem;"
						setOptions={{
							height: 350,

							buttonList: [
								["formatBlock"],
								["paragraphStyle", "blockquote"],
								[
									"bold",
									"underline",
									"italic",
									"strike",
									"subscript",
									"superscript",
								],
								["fontColor", "hiliteColor", "textStyle"],
								["removeFormat"],
								["outdent", "indent"],
								["list"],
								["table", "link", "image", "video"],
							],
						}}
						onChange={(content) => setEditorContent(content)}
						onImageUpload={handleImageUpload}
					/>

					<button
						className={styles.button}
						onClick={handlePost}
						disabled={loading}
					>
						پست {loading && <LoaderSpinner />}
					</button>
				</div>
			</Layout>
		</>
	);
};

export default addPost;

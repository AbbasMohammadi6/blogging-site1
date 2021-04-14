import { useState, useEffect } from "react";
import Router from "next/router";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { createPost } from "slices/createPostSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import Header from "components/Header";

const addPost = () => {
	const [editorContent, setEditorContent] = useState("");
	const [title, setTitle] = useState("");

	const dispatch = useAppDispatch();

	const { loading, error, data } = useAppSelector((state) => state.postCreate);

	const {
		userInfo: { token, user },
	} = useAppSelector((state) => state.userRegister);

	const handlePost = (): void => {
		dispatch(createPost({ title, body: editorContent }));
	};

	const handleImageUpload = (
		targetImgElement,
		index,
		state,
		imageInfo,
		remainingFilesCount
	): void => {
		console.log(targetImgElement, index, state, imageInfo, remainingFilesCount);
	};

	// 	handleImageUpload(targetImgElement, index, state, imageInfo, remainingFilesCount){
	// 	console.log(targetImgElement, index, state, imageInfo, remainingFilesCount)
	// }

	if (typeof window !== "undefined" && !user.name) Router.push("/");

	return (
		<>
			<Header />
			{loading ? <h1>Loading...</h1> : error ? <h1>{error}</h1> : ""}

			{user.name && user.name}

			<input
				type="text"
				placeholder="Enter the title here"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<SunEditor
				defaultValue='<div><p>some <span style="background: yellow">text</span></p><h1 style="color: palevioletred">heading</h1></div>'
				placeholder="Please type here..."
				autoFocus={true}
				setOptions={{
					height: 200,
					buttonList: buttonList.complex,
				}}
				onChange={(content) => setEditorContent(content)}
				onImageUpload={handleImageUpload}
			/>

			<button onClick={handlePost}>POST</button>
		</>
	);
};

export default addPost;

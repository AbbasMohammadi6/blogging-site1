import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import SunEditor, { buttonList } from "suneditor-react";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import Header from "components/Header";
import { createPost } from "slices/createPostSlice";
import "suneditor/dist/css/suneditor.min.css";

export default function Home() {
	const [editorContent, setEditorContent] = useState("");
	const [title, setTitle] = useState("");

	const dispatch = useAppDispatch();

	const userRegister = useAppSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const {
		loading: postCreateLoading,
		error: postCreateError,
		data,
	} = useAppSelector((state) => state.postCreate);

	const handlePost = (): void => {
		dispatch(createPost({ title, body: editorContent }));
	};

	return (
		<>
			<Header />

			{postCreateLoading ? <h1>Loading...</h1> : error ? <h1>{error}</h1> : ""}

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
			/>

			<button onClick={handlePost}>POST</button>
		</>
	);
}

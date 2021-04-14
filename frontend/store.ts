import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "slices/counterSlice";
import userRegisterReducer from "slices/registerSlice";
import userLogingReducer from "slices/loginSlice";
import postCreateReducer from "slices/createPostSlice";
import postsGetReducer from "slices/getPostsSlice";
import addCommentReducer from "slices/addCommentSlice";
import themeReducer from "slices/themeSlice";

let preloadedState = {
	userRegister: { userInfo: { user: { name: "", email: "" }, token: "" } },
};

if (typeof window !== "undefined") {
	preloadedState = {
		userRegister: localStorage.getItem("userRegister")
			? JSON.parse(localStorage.getItem("userRegister"))
			: { userInfo: { user: { name: "", email: "" }, token: "" } },
	};
}

const store = configureStore({
	preloadedState,
	reducer: {
		counter: counterReducer,
		userRegister: userRegisterReducer,
		userLogin: userLogingReducer,
		postCreate: postCreateReducer,
		postsGet: postsGetReducer,
		addComment: addCommentReducer,
		theme: themeReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

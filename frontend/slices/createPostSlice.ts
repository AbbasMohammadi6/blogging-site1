import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
	loading: boolean;
	error?: string;
	success?: boolean;
}

const initialState: State = {
	loading: false,
};

const slice = createSlice({
	name: "creaetPost",
	initialState,
	reducers: {
		request: (state: State): void => {
			state.loading = true;
		},

		success: (state: State): void => {
			state.loading = false;
			state.success = true;
			state.error = "";
		},

		fail: (state: State, action: PayloadAction<string>): void => {
			state.loading = false;
			state.error = action.payload;
		},

		reset: (state: State) => {
			state.error = "";
			state.success = false;
		},
	},
});

const { request, success, fail, reset } = slice.actions;

const createPost = (post: { title: string; body: string }) => async (
	dispatch,
	getState
): Promise<void> => {
	dispatch(request());

	const {
		userInfo: { token },
	} = getState().userRegister;

	const config = {
		headers: {
			"Content-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
	};

	try {
		await axios.post("/api/posts/create", post, config);

		dispatch(success());
	} catch (error) {
		dispatch(fail(error.response.data.message));
	}
};

export { createPost, reset };
export default slice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Data {
	title: string;
	body: string;
	_id: string;
	createdAt: string;
	updatedAt: string;
}

interface State {
	loading: boolean;
	error: string;
	data: Data;
}

const initialState: State = {
	loading: false,
	error: "",
	data: {
		title: "",
		body: "",
		_id: "",
		createdAt: "",
		updatedAt: "",
	},
};

const slice = createSlice({
	name: "creaetPost",
	initialState,
	reducers: {
		request: (state: State): void => {
			state.loading = true;
		},

		success: (state: State, action: PayloadAction<Data>): void => {
			state.loading = false;
			state.data = action.payload;
			state.error = "";
		},

		fail: (state: State, action: PayloadAction<string>): void => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

const { request, success, fail } = slice.actions;

export const createPost = (post: { title: string; body: string }) => async (
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
		const { data } = await axios.post("/api/posts/create", post, config);

		dispatch(success(data));
	} catch (error) {
		dispatch(fail(error.response.data.message));
	}
};

export default slice.reducer;

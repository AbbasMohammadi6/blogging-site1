import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Data = {
	title: string;
	body: string;
	owner: string;
	createdAt: string;
	updatedAt: string;
}[];

interface State {
	loading: boolean;
	error: string;
	data: Data;
}

const initialState: State = {
	loading: false,
	error: "",
	data: [],
};

const slice = createSlice({
	name: "getPosts",
	initialState,
	reducers: {
		request: (state: State): void => {
			state.loading = true;
		},

		success: (state: State, action: PayloadAction<Data>): void => {
			state.loading = false;
			state.error = "";
			state.data = action.payload;
		},

		fail: (state: State, action: PayloadAction<string>): void => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

const { request, success, fail } = slice.actions;

export const getPosts = () => async (dispatch): Promise<void> => {
	dispatch(request());

	try {
		const { data } = await axios.get("/api/posts");

		dispatch(success(data));
	} catch (error) {
		dispatch(fail(error.response.data.message));
	}
};

export default slice.reducer;

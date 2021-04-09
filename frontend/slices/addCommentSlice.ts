import axios from "axios";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";

interface State {
	loading: boolean;
	error?: string;
	success?: boolean;
}

const initialState: State = {
	loading: false,
};

const slice = createSlice({
	name: "addComment",

	initialState,

	reducers: {
		request: (state: State) => {
			state.loading = true;
		},

		success: (state: State) => {
			state.success = true;
			state.loading = false;
		},

		fail: (state: State, action: PayloadAction<string>) => {
			state.error = action.payload;
			state.loading = false;
		},
	},
});

const { request, success, fail } = slice.actions;

export const addComment = ({
	text,
	id,
}: {
	text: string;
	id: string;
}) => async (dispatch, getState): Promise<void> => {
	dispatch(request());

	const {
		userInfo: { token },
	} = getState().userRegister;

	const config = {
		headers: {
			"Conent-Type": "application/json",
			authorization: `Bearer ${token}`,
		},
	};

	try {
		await axios.post(`/api/posts/comment/${id}`, { text, id }, config);

		dispatch(success());
	} catch (e) {
		dispatch(fail(e.response.data.message));
	}
};

export default slice.reducer;

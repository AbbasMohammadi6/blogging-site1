import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface State {
	loading: boolean;
	userInfo: Data;
	error: any; // CHANGE THIS LATER
}

interface Data {
	user: {
		name: string;
		email: string;
	};

	token: string;
}

const initialState: State = {
	loading: false,
	userInfo: { user: { name: "", email: "" }, token: "" },
	error: "",
};

const slice = createSlice({
	name: "register",

	initialState,

	reducers: {
		request: (state: State) => {
			state.loading = true;
		},

		success: (state: State, action: PayloadAction<Data>) => {
			state.loading = false;
			state.userInfo = action.payload;
			state.error = null;
		},

		fail: (state: State, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		reset: (state: State) => {
			state.error = "";
		},
	},
});

const { request, success, fail, reset } = slice.actions;

const registerUser = (user: {
	name: string;
	email: string;
	password: string;
}) => async (dispatch) => {
	dispatch(request());

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const { data } = await axios.post("/api/users/register", user, config);

		dispatch(success(data));

		localStorage.setItem(
			"userRegister",
			JSON.stringify({ userInfo: { user: data.user, token: data.token } })
		);
	} catch (e) {
		dispatch(fail(e.response.data.message));
	}
};

export { success, reset, registerUser };
export default slice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { successUserRegister } from "slices/registerSlice";

interface Data {
	user: {
		name: string;
		email: string;
	};

	token: string;
}

interface loginState {
	loading: boolean;
	error: string;
	userInfo: Data;
}

const initialState: loginState = {
	loading: false,
	error: "",
	userInfo: {
		user: {
			name: "",
			email: "",
		},

		token: "",
	},
};

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		request: (state: loginState) => {
			state.loading = true;
		},

		success: (state: loginState, action: PayloadAction<Data>) => {
			state.loading = false;
			state.userInfo = action.payload;
			state.error = "";
		},

		fail: (state: loginState, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		reset: (state: loginState) => {
			state.error = "";
		},
	},
});

const { request, success, fail, reset } = loginSlice.actions;

const loginUser = (user) => async (dispatch): Promise<void> => {
	dispatch(request());

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const { data } = await axios.post("/api/users/login", user, config);

		dispatch(success(data));
		dispatch(successUserRegister(data));

		localStorage.setItem(
			"userRegister",
			JSON.stringify({ userInfo: { user: data.user, token: data.token } })
		);
	} catch (error) {
		dispatch(fail(error.response.data.message));
	}
};

export { loginUser, reset };
export default loginSlice.reducer;

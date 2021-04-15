import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserRegisterState {
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

const initialState: UserRegisterState = {
	loading: false,
	userInfo: { user: { name: "", email: "" }, token: "" },
	error: "",
};

const registerSlice = createSlice({
	name: "register",

	initialState,

	reducers: {
		requestUserRegister: (state: UserRegisterState) => {
			state.loading = true;
		},

		successUserRegister: (
			state: UserRegisterState,
			action: PayloadAction<Data>
		) => {
			state.loading = false;
			state.userInfo = action.payload;
			state.error = null;
		},

		failUserRegister: (
			state: UserRegisterState,
			action: PayloadAction<string>
		) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	requestUserRegister,
	successUserRegister,
	failUserRegister,
} = registerSlice.actions;

export const registerUser = (user: {
	name: string;
	email: string;
	password: string;
}) => async (dispatch) => {
	dispatch(requestUserRegister());

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const { data } = await axios.post("/api/users/register", user, config);

		dispatch(successUserRegister(data));

		localStorage.setItem(
			"userRegister",
			JSON.stringify({ userInfo: { user: data.user, token: data.token } })
		);
	} catch (e) {
		dispatch(failUserRegister(e.response.data.message));
	}
};

export default registerSlice.reducer;

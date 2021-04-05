import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "slices/counterSlice";
import userRegisterReducer from "slices/registerSlice";
import userLogingReducer from "slices/loginSlice";

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
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { createSlice } from "@reduxjs/toolkit";

interface State {
	isDark: boolean;
}

const slice = createSlice({
	name: "theme",

	initialState: { isDark: false },

	reducers: {
		changeTheme: (state: State) => {
			state.isDark = !state.isDark;
		},
	},
});

export const { changeTheme } = slice.actions;

export default slice.reducer;

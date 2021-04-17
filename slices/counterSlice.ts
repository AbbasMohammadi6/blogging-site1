import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
	value: number;
}

const initialState: CounterState = {
	value: 0,
};

export const counterSlice = createSlice({
	name: "counter",

	initialState,

	reducers: {
		increment: (state) => {
			state.value += 1;
		},

		decrement: (state) => {
			state.value -= 1;
		},

		incrementByValue: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
	},
});

export const { increment, decrement, incrementByValue } = counterSlice.actions;

export const asyncIncrement = () => (dispatch) => {
	setTimeout(() => dispatch(increment()), 2000);
};

export default counterSlice.reducer;

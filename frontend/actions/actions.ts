import { Dispatch } from "redux";
import { INCREMENT, DECREMENT, RESET } from "../constants/constants";
import { Action } from "../reducers/reducers";

export const increment = () => (dispatch: Dispatch<Action>) => {
	dispatch({ type: INCREMENT });
};

export const decrement = () => (dispatch: Dispatch<Action>) => {
	dispatch({ type: DECREMENT });
};

export const reset = () => (dispatch: Dispatch<Action>) => {
	dispatch({ type: RESET });
};

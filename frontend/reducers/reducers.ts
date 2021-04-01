import { INCREMENT, DECREMENT, RESET } from "../constants/constants";

type State = number;

interface Increment {
	type: typeof INCREMENT;
}

interface Decrement {
	type: typeof DECREMENT;
}

interface Reset {
	type: typeof RESET;
}

export type Action = Increment | Decrement | Reset;

const counterReducer = (state: State = 0, action: Action) => {
	switch (action.type) {
		case INCREMENT:
			return state + 1;

		case DECREMENT:
			return state - 1;

		case RESET:
			return 0;

		default:
			return state;
	}
};

const reducers = {
	counter: counterReducer,
};

export default reducers;

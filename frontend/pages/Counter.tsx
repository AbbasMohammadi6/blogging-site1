import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { increment, decrement, reset } from "../actions/actions";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../utils/hooks";
import {
	increment,
	decrement,
	incrementByValue,
	asyncIncrement,
} from "../slices/counterSlice";

interface Props {}

const Counter: React.FC<Props> = () => {
	const [val, setVal] = useState(0);

	// const dispatch = useDispatch();
	// const counter = useSelector<any>((state) => state.counter);

	const dispatch = useDispatch();
	const counter = useAppSelector((state) => state.counter);

	return (
		<>
			{counter.value}

			<button onClick={() => dispatch(increment())}>increment</button>
			<button onClick={() => dispatch(decrement())}>decrement</button>
			<input
				type="number"
				value={val}
				onChange={(e) => setVal(+e.target.value)}
			/>
			<button onClick={() => dispatch(incrementByValue(val))}>
				increment By Value
			</button>
			<button onClick={() => dispatch(asyncIncrement())}>
				async Increment
			</button>

			<Link href="/">
				<a>home</a>
			</Link>
		</>
	);
};

export default Counter;

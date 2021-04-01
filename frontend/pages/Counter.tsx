import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, reset } from "../actions/actions";
import Link from "next/link";

interface Props {}

const Counter: React.FC<Props> = () => {
	const dispatch = useDispatch();
	const counter = useSelector<any>((state) => state.counter);

	return (
		<>
			{counter}

			<button onClick={() => dispatch(increment())}>increment</button>
			<button onClick={() => dispatch(decrement())}>decrement</button>
			<button onClick={() => dispatch(reset())}>reset</button>

			<Link href="/">
				<a>home</a>
			</Link>
		</>
	);
};

export default Counter;

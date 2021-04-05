import React, { FC, useState, useEffect } from "react";
import Router from "next/router";
import { loginUser } from "slices/loginSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import styles from "styles/Register.module.scss";
import Header from "components/Header";

interface Props {}

const Register: FC<Props> = (props: Props) => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const dispatch = useAppDispatch();

	const userLogin = useAppSelector((state) => state.userLogin);
	const { loading, error, userInfo } = userLogin;

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		dispatch(loginUser({ email, password }));
	};

	useEffect(() => {
		if (userInfo.user.name) {
			console.log("USER IS AUTHENTICATED");
			Router.push("/");
		}
	}, [userInfo]);

	return (
		<>
			<Header />

			{loading ? <h1>Loading....</h1> : error ? <h2>Error: {error}</h2> : ""}

			<form onSubmit={handleSubmit} className={styles.form}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button type="submit">Register</button>
			</form>
		</>
	);
};

export default Register;

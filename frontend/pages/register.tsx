import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import { registerUser } from "slices/registerSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import styles from "styles/Register.module.scss";
import Header from "components/Header";

interface Props {}

const Register: FC<Props> = (props: Props) => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const dispatch = useAppDispatch();

	const userRegister = useAppSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const { isDark } = useAppSelector((state) => state.theme);

	/**Todo: Add from validation like isEmail later**/

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return console.log("Passwords don't match");
		}

		dispatch(registerUser({ name, email, password }));
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

			<form
				onSubmit={handleSubmit}
				className={`${styles.form} ${isDark && styles.darkTheme}`}
			>
				<h1>عضویت در سایت</h1>

				<input
					type="text"
					placeholder="نام"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					type="email"
					placeholder="ایمیل"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					type="password"
					placeholder="رمز"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<input
					type="password"
					placeholder="تأیید رمز"
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				/>

				<button type="submit">ثبت نام</button>

				<small>
					قبلاً عضو شده اید؟{" "}
					<Link href="/login">
						<a>ورود</a>
					</Link>
				</small>
			</form>
		</>
	);
};

export default Register;

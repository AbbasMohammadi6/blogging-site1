import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import {
	registerUser,
	reset as resetRegisterError,
} from "slices/registerSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import styles from "styles/Form.module.scss";
import Header from "components/Header";
import Loader from "components/Loader";
import Modal from "components/Modal";
import Layout from "components/Layout";

interface Props {}

const Register: FC<Props> = (props: Props) => {
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");

	const [modal, setModal] = useState<{ message: string; isOpen: boolean }>({
		message: "",
		isOpen: false,
	});

	const dispatch = useAppDispatch();

	const userRegister = useAppSelector((state) => state.userRegister);
	const { loading, error, userInfo } = userRegister;

	const { isDark } = useAppSelector((state) => state.theme);

	/**Todo: Add from validation like isEmail later**/

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			return setModal({
				message: "رمز و تأیید رمز یکسان نیستند.",
				isOpen: true,
			});
		}

		dispatch(registerUser({ name, email, password }));
	};

	const closeModal = (): void => {
		dispatch(resetRegisterError());
		setModal({ message: "", isOpen: false });
	};

	useEffect(() => {
		if (error) {
			setModal({ message: error, isOpen: true });
		}
	}, [error]);

	useEffect(() => {
		if (userInfo.user.name) {
			Router.push("/");
		}
	}, [userInfo]);

	return (
		<>
			<Header />

			<Layout>
				<Modal
					isOpen={modal.isOpen}
					closeModal={closeModal}
					message={modal.message}
				/>

				{loading ? (
					<Loader />
				) : (
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
							required={true}
						/>

						<input
							type="email"
							placeholder="ایمیل"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required={true}
						/>

						<input
							type="password"
							placeholder="رمز"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required={true}
						/>

						<input
							type="password"
							placeholder="تأیید رمز"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required={true}
						/>

						<button type="submit">ثبت نام</button>

						<small>
							قبلاً عضو شده اید؟{" "}
							<Link href="/login">
								<a>ورود</a>
							</Link>
						</small>
					</form>
				)}
			</Layout>
		</>
	);
};

export default Register;

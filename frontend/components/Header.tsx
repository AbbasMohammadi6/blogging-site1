import Link from "next/link";
import { useAppSelector } from "utils/hooks";
import styles from "styles/Header.module.scss";

const Header = () => {
	const userRegister = useAppSelector((state) => state.userRegister);
	const { userInfo: registerUserInfo } = userRegister;

	const userLogin = useAppSelector((state) => state.userLogin);
	const { userInfo: loginUserInfo } = userLogin;

	const name = loginUserInfo.user.name || registerUserInfo.user.name;

	return (
		<header className={styles.header}>
			<Link href="/">
				<a className={styles.logo}>Logo</a>
			</Link>

			<div className={styles.name}>
				{name ? (
					<div>
						{name}
						{"   "}

						<Link href="/createpost">
							<a>Create a Post</a>
						</Link>
					</div>
				) : (
					<>
						<Link href="/register">
							<a>Register</a>
						</Link>

						<Link href="/login">
							<a>Login</a>
						</Link>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;

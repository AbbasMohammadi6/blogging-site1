import { useEffect } from "react";
import Link from "next/link";
import { useAppSelector } from "utils/hooks";
import styles from "styles/Header.module.scss";
import Layout from "components/Layout";
import Toggler from "components/Toggler";

const Header = () => {
	const userRegister = useAppSelector((state) => state.userRegister);
	const { userInfo: registerUserInfo } = userRegister;

	const userLogin = useAppSelector((state) => state.userLogin);
	const { userInfo: loginUserInfo } = userLogin;

	const { isDark } = useAppSelector((state) => state.theme);

	// Why use useEffect to get that variable ? If you need to access such properties, access it within useEffect, so as to make sure that document is already established by then. https://stackoverflow.com/questions/46443652/react-16-warning-expected-server-html-to-contain-a-matching-div-in-body
	let name: string = "";
	useEffect(() => {
		name = loginUserInfo.user.name || registerUserInfo.user.name;
	});

	return (
		<header className={`${styles.header} ${isDark && styles.darkTheme}`}>
			<Layout>
				<nav>
					<Link href="/">
						<a className={styles.brand}>بلاگ</a>
					</Link>

					<Toggler />

					{/*<i className="fas fa-sun-o"></i>
					<i className="fas fa-moon-o"></i>*/}

					<div className={styles.links}>
						{name ? (
							<div>
								{name}
								{"   "}

								<Link href="/createpost">
									<a>پست جدید</a>
								</Link>
							</div>
						) : (
							<>
								<Link href="/register">
									<a>ثبت نام </a>
								</Link>

								<Link href="/login">
									<a>ورود</a>
								</Link>
							</>
						)}
					</div>
				</nav>
			</Layout>
		</header>
	);
};

export default Header;

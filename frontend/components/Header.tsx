import Link from "next/link";
import { useAppSelector } from "utils/hooks";
import styles from "styles/Header.module.scss";
import Layout from "components/Layout";

const Header = () => {
	const userRegister = useAppSelector((state) => state.userRegister);
	const { userInfo: registerUserInfo } = userRegister;

	const userLogin = useAppSelector((state) => state.userLogin);
	const { userInfo: loginUserInfo } = userLogin;

	const name = loginUserInfo.user.name || registerUserInfo.user.name;

	return (
		<header className={styles.header}>
			<Layout>
				<nav>
					<Link href="/">
						<a className={styles.brand}>بلاگ</a>
					</Link>

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

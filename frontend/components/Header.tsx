import { useEffect } from "react";
import Link from "next/link";
import { useAppSelector } from "utils/hooks";
import styles from "styles/Header.module.scss";
import Layout from "components/Layout";
import Toggler from "components/Toggler";

const Header = () => {
	const userRegister = useAppSelector((state) => state.userRegister);
	const { userInfo: registerUserInfo } = userRegister;

	const { isDark } = useAppSelector((state) => state.theme);

	return (
		<header className={`${styles.header} ${isDark && styles.darkTheme}`}>
			<Layout>
				<nav>
					<Link href="/">
						<a className={styles.brand}>بلاگ</a>
					</Link>

					<Toggler />

					<div className={styles.links}>
						{userRegister.userInfo?.user?.name ? (
							<div>
								{userRegister.userInfo.user.name}
								{"   "}

								<Link href="/createpost">
									<a>پست جدید</a>
								</Link>
							</div>
						) : (
							<>
								<Link href="/register">
									<a>عضویت </a>
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

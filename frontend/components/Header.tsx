import { useState, useEffect } from "react";
import Link from "next/link";
import { useAppSelector } from "utils/hooks";
import styles from "styles/Header.module.scss";
import Layout from "components/Layout";
import Toggler from "components/Toggler";

const Header = () => {
	const userRegister = useAppSelector((state) => state.userRegister);

	const { isDark } = useAppSelector((state) => state.theme);

	const [menuOpen, setMenuOpen] = useState(false);

	// Why get userInfo inisde useEffect? That's required because the first render should match the initial render of the server. If I don't do that, because we don't have redux on the server, when the code gets loaded in the browser, in the first render we have something that is different than what was on the server. see this link: https://github.com/vercel/next.js/discussions/17443
	const [userInfo, setUserInfo] = useState<any>({});
	useEffect(() => {
		setUserInfo(userRegister.userInfo);
	}, [userInfo]);

	return (
		<header
			className={`${styles.header} ${isDark && styles.darkTheme} ${
				menuOpen && styles.showMenu
			}`}
		>
			<nav>
				<Link href="/">
					<a className={styles.brand}>بلاگ</a>
				</Link>

				<div className={styles.linksContainer}>
					<Toggler />

					{userInfo?.user?.name ? (
						<div className={styles.links}>
							<Link href="/createpost">
								<a>{userInfo.user.name}</a>
							</Link>

							<Link href="/createpost">
								<a>پست جدید</a>
							</Link>
						</div>
					) : (
						<div className={styles.links}>
							<Link href="/register">
								<a>عضویت </a>
							</Link>

							<Link href="/login">
								<a>ورود</a>
							</Link>
						</div>
					)}
				</div>

				<div className={styles.menuBtn} onClick={() => setMenuOpen(!menuOpen)}>
					<div />
				</div>
			</nav>
		</header>
	);
};

export default Header;

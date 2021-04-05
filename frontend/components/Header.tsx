import Link from "next/link";
import { useAppSelector } from "utils/hooks";
import styles from "styles/Header.module.scss";

const Header = () => {
	const userRegister = useAppSelector((state) => state.userRegister);
	const { userInfo } = userRegister;

	return (
		<header className={styles.header}>
			<Link href="/">
				<a className={styles.logo}>Logo</a>
			</Link>

			<div className={styles.name}>
				{userInfo.user.name ? (
					userInfo.user.name
				) : (
					<Link href="/register">
						<a>Register</a>
					</Link>
				)}
			</div>
		</header>
	);
};

export default Header;

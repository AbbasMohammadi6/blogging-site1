import { useAppSelector } from "utils/hooks";
import styles from "styles/Layout.module.scss";

const Layout = ({ children }) => {
	const { isDark } = useAppSelector((state) => state.theme);

	return (
		<div className={styles.main}>
			{children}

			<style jsx global>{`
				body {
					background: ${isDark ? "#333" : "white"};
					color: ${isDark ? "white" : "black"};
				}
			`}</style>
		</div>
	);
};
export default Layout;

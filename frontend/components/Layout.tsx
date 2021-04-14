import styles from "styles/Layout.module.scss";

const Layout = ({ children }) => {
	return <div className={styles.main}>{children}</div>;
};

export default Layout;

import styles from "styles/Loader.module.scss";

const Loader = () => {
	return (
		<div>
			<div className={styles.parent}>
				<div className={styles.child}></div>
				<div className={styles.child}></div>
				<div className={styles.child}></div>
				<div className={styles.child}></div>
			</div>
		</div>
	);
};

export default Loader;

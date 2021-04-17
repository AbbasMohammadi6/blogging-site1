import { ChangeEvent } from "react";
import { changeTheme } from "slices/themeSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import styles from "styles/Toggler.module.scss";

const Toggler = () => {
	const dispatch = useAppDispatch();

	const { isDark } = useAppSelector((state) => state.theme);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		dispatch(changeTheme());
	};

	return (
		<div className={`${styles.outerdiv} ${isDark && styles.darkTheme}`}>
			<div className={styles.outerdivSun}>
				<i className="fas fa-sun" id="sun"></i>
			</div>
			<div className={styles.outerdivMoon}>
				<i className="fas fa-moon" id="moon"></i>
			</div>
			<input type="checkbox" onChange={handleChange} checked={isDark} />
			<div className={styles.toggleKnob}></div>
		</div>
	);
};

export default Toggler;

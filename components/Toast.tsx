import { useState } from "react";
import Link from "next/link";
import styles from "styles/Toast.module.scss";

const Toast = () => {
	const [close, setClose] = useState(false);

	const handleClose = (): void => {
		setClose(true);
	};

	return (
		<div className={`${styles.main} ${close && styles.close}`}>
			<i className="fas fa-times" onClick={handleClose}></i>
			<p>این پروژه در حال تکمیل شدن است.</p>
			<p>درصد پیشرفت پروژه: ۶۰ درصد</p>
			<p>
				<Link href="https://github.com/AbbasMohammadi6/shop">
					<a>لینک</a>
				</Link>{" "}
				کد در گیت هاب
			</p>
		</div>
	);
};

export default Toast;

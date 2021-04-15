import { useState } from "react";
import styles from "styles/Modal.module.scss";

const Modal = ({ toggleModal, isOpen, message }) => {
	return (
		<div className={`${styles.main} ${isOpen && styles.open}`}>
			<div onClick={toggleModal} className={styles.backdrop} />

			<div className={styles.modal}>
				<p>{message}</p>

				<button onClick={toggleModal}>باشه</button>
			</div>
		</div>
	);
};

export default Modal;

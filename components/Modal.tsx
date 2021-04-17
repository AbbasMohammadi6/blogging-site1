import { useState } from "react";
import styles from "styles/Modal.module.scss";

interface Props {
	closeModal: () => void;
	isOpen: boolean;
	message: string;
}

const Modal = ({ closeModal, isOpen, message }: Props) => {
	return (
		<div className={`${styles.main} ${isOpen && styles.open}`}>
			<div onClick={closeModal} className={styles.backdrop} />

			<div className={styles.modal}>
				<p>{message}</p>

				<button onClick={closeModal}>باشه</button>
			</div>
		</div>
	);
};

export default Modal;

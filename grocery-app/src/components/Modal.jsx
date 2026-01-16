import { useEffect } from "react";

function Modal({ open, onClose, children }) {
	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (e) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [open, onClose]);

	if (!open) return null;

	return (
		<div className="modal-backdrop" onClick={onClose}>
			<div className="modal" onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}

export default Modal;

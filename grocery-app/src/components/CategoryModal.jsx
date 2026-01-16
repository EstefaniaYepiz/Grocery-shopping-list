import { useState } from "react";
import Modal from "./Modal";
function CategoryModal({ open, onClose, onAddCategory }) {
	const [value, setValue] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!value.trim()) return;

		onAddCategory(value);
		setValue("");
		onClose();
	};

	if (!open) return null;

	return (
		<Modal open={open} onClose={onClose}>
			<form onSubmit={handleSubmit}>
				<h3>Add category</h3>

				<input
					autoFocus
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Category name"
				/>

				<button type="submit">Add</button>
			</form>
		</Modal>
	);
}
export default CategoryModal;

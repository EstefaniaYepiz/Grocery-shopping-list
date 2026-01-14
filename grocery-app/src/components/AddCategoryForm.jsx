function AddCategoryForm({ value, onChange, onAdd }) {
	return (
		<div className="add-category">
			<input
				type="text"
				placeholder="New category"
				value={value}
				onChange={(e) => onChange(e.target.value)}
			/>
			<button onClick={onAdd}>+</button>
		</div>
	);
}

export default AddCategoryForm;

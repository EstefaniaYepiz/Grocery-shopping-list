function AddItemForm({
	product,
	setProduct,
	brand,
	setBrand,
	category,
	setCategory,
	categories,
	onAddItem,
}) {
	const handleSubmit = (e) => {
		e.preventDefault();
		onAddItem();
	};

	return (
		<form className="add-item-form" onSubmit={handleSubmit}>
			<input
				value={product}
				onChange={(e) => setProduct(e.target.value)}
				placeholder="e.g. Eggs"
			/>

			<input
				value={brand}
				onChange={(e) => setBrand(e.target.value)}
				placeholder="Brand (optional)"
			/>

			<select value={category} onChange={(e) => setCategory(e.target.value)}>
				{categories.map((cat) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select>

			<button type="submit">+ Add Item</button>
		</form>
	);
}
export default AddItemForm;

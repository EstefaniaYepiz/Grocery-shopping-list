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
	return (
		<div className="add-item">
			<div className="field">
				<label>Product</label>
				<input
					type="text"
					placeholder="e.g. Eggs"
					value={product}
					onChange={(e) => setProduct(e.target.value)}
				/>
			</div>

			<div className="field">
				<label>Brand (optional)</label>
				<input
					type="text"
					placeholder="e.g. Organic Valley"
					value={brand}
					onChange={(e) => setBrand(e.target.value)}
				/>
			</div>

			<div className="field">
				<label>Category</label>
				<select value={category} onChange={(e) => setCategory(e.target.value)}>
					{categories
						.filter((c) => c !== "All")
						.map((cat) => (
							<option key={cat}>{cat}</option>
						))}
				</select>
			</div>

			<button className="add-button" onClick={onAddItem}>
				+ Add Item
			</button>
		</div>
	);
}

export default AddItemForm;

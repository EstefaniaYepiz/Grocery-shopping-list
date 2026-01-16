import { useState } from "react";

function RecipeForm({ onSave, onCancel, categories }) {
	const [name, setName] = useState("");
	const [ingredients, setIngredients] = useState([]);
	const [product, setProduct] = useState("");
	const [category, setCategory] = useState(categories[0] || "Other");
	const [quantity, setQuantity] = useState(1);

	function addIngredient() {
		if (!product.trim()) return;

		setIngredients((prev) => [
			...prev,
			{
				product,
				category,
				quantity,
			},
		]);

		setProduct("");
		setQuantity(1);
	}

	function saveRecipe() {
		if (!name.trim() || ingredients.length === 0) return;

		onSave({
			id: Date.now(),
			name,
			ingredients,
		});
	}

	return (
		<div className="recipe-form">
			<h3>New Recipe</h3>

			<input
				placeholder="Recipe name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<div className="ingredient-row">
				<input
					placeholder="Ingredient"
					value={product}
					onChange={(e) => setProduct(e.target.value)}
				/>

				<select value={category} onChange={(e) => setCategory(e.target.value)}>
					{categories.map((cat) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>

				<input
					type="number"
					min="1"
					value={quantity}
					onChange={(e) => setQuantity(Number(e.target.value))}
				/>

				<button onClick={addIngredient}>＋</button>
			</div>

			<ul>
				{ingredients.map((ing, i) => (
					<li key={i}>
						{ing.quantity} × {ing.product} ({ing.category})
					</li>
				))}
			</ul>

			<div className="recipe-actions">
				<button onClick={saveRecipe}>Save recipe</button>
				<button onClick={onCancel}>Cancel</button>
			</div>
		</div>
	);
}

export default RecipeForm;

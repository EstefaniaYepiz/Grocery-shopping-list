import { useState, useEffect } from "react";
function RecipePicker({ recipes, onAddRecipe, onCreateRecipe }) {
	const [selectedId, setSelectedId] = useState("");

	const selectedRecipe = recipes.find((r) => r.id === selectedId);

	return (
		<div className="recipe-picker">
			<select
				value={selectedId}
				onChange={(e) => setSelectedId(e.target.value)}
			>
				<option value="">Select recipe</option>
				{recipes.map((recipe) => (
					<option key={recipe.id} value={recipe.id}>
						{recipe.name}
					</option>
				))}
			</select>

			<button
				disabled={!selectedRecipe}
				onClick={() => onAddRecipe(selectedRecipe)}
			>
				Add ingredients
			</button>

			<button onClick={onCreateRecipe}>＋ Recipe</button>
		</div>
	);
}
export default RecipePicker;

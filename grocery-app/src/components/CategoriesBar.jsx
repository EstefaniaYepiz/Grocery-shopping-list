import React from "react";

function CategoriesBar({
	categories,
	activeCategory,
	onSelectCategory,
	onRemoveCategory,
	showStock,
	onToggleStock,
	theme,
	onToggleTheme,
}) {
	return (
		<div className="categories">
			{categories.map((cat) => (
				<div
					key={cat}
					className={`category ${activeCategory === cat ? "active" : ""}`}
					onClick={() => onSelectCategory(cat)}
				>
					<span className="category-name">{cat}</span>

					{cat !== "All" && (
						<button
							className="delete-category"
							onClick={(e) => {
								e.stopPropagation();
								onRemoveCategory(cat);
							}}
						>
							✕
						</button>
					)}
				</div>
			))}

			<div
				className={`category pill-toggle ${showStock ? "active" : ""}`}
				onClick={onToggleStock}
			>
				<span className="category-name">Stock</span>
			</div>

			<div
				className={`category pill-toggle ${theme === "dark" ? "active" : ""}`}
				onClick={onToggleTheme}
			>
				<span className="category-name">
					{theme === "dark" ? "🌙 Dark" : "☀️ Light"}
				</span>
			</div>
		</div>
	);
}

export default CategoriesBar;

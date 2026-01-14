function CategoryManager({
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
		<>
			<div className="categories">
				{categories.map((cat) => (
					<div
						key={cat}
						className={`category ${activeCategory === cat ? "active" : ""}`}
						onClick={() => onSelectCategory(cat)}
					>
						<span>{cat}</span>

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
			</div>

			<div className="toggle">
				<div
					className={`category pill-toggle ${showStock ? "active" : ""}`}
					onClick={onToggleStock}
				>
					Stock at home
				</div>

				<div
					className={`category pill-toggle ${theme === "dark" ? "active" : ""}`}
					onClick={onToggleTheme}
				>
					{theme === "dark" ? "Dark" : "Light"}
				</div>
			</div>
		</>
	);
}

export default CategoryManager;

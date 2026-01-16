function ActionsMenu({
	open,
	onClose,
	onToggleTheme,
	onToggleStock,
	showStock,
	onAddCategory,
	onOpenRecipes,
}) {
	if (!open) return null;

	return (
		<div className="menu-backdrop" onClick={onClose}>
			<div className="menu" onClick={(e) => e.stopPropagation()}>
				<button onClick={onToggleTheme}>Toggle dark mode</button>

				<button onClick={onToggleStock}>
					{showStock ? "Hide stock" : "Show stock"}
				</button>

				<button onClick={onAddCategory}>Add category</button>

				<button onClick={onOpenRecipes}>Recipes</button>
			</div>
		</div>
	);
}

export default ActionsMenu;

function Header({ onOpenMenu }) {
	return (
		<header className="header">
			<h1 className="logo">Groceries</h1>

			<button
				className="menu-button"
				onClick={onOpenMenu}
				aria-label="Open menu"
			>
				☰
			</button>
		</header>
	);
}
export default Header;

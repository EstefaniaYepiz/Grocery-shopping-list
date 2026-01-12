import { useState, useEffect } from "react";

function App() {
	const [product, setProduct] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("Fruits");

	const [lists, setLists] = useState([]);
	const [activeListId, setActiveListId] = useState(null);
	const [newCategory, setNewCategory] = useState("");
	const [hasLoaded, setHasLoaded] = useState(false);
	const [showStock, setShowStock] = useState(true);

	const activeList = lists.find((list) => list.id === activeListId);
	const items = activeList?.items || [];
	const categories = activeList?.categories || ["All"];
	const activeCategory = activeList?.activeCategory || "All";
	const listNames = lists.map((list) => ({
		id: list.id,
		name: list.name,
	}));
	const [editingListId, setEditingListId] = useState(null);
	const [listNameInput, setListNameInput] = useState("");

	function updateActiveList(updater) {
		setLists((prevLists) =>
			prevLists.map((list) => (list.id === activeListId ? updater(list) : list))
		);
	}

	useEffect(() => {
		const savedData = localStorage.getItem("groceryAppData");

		if (savedData) {
			const parsed = JSON.parse(savedData);

			if (parsed.lists && parsed.lists.length > 0) {
				setLists(parsed.lists);
				setActiveListId(parsed.activeListId);
			} else {
				const defaultList = {
					id: Date.now(),
					name: "My List",
					items: parsed.items || [],
					categories: parsed.categories || ["All"],
					activeCategory: parsed.activeCategory || "All",
				};

				setLists([defaultList]);
				setActiveListId(defaultList.id);
			}

			if (parsed.showStock !== undefined) {
				setShowStock(parsed.showStock);
			}
		}
		setHasLoaded(true);
	}, []);
	useEffect(() => {
		if (!hasLoaded) return;

		const dataToSave = {
			lists,
			activeListId,
			showStock,
		};

		localStorage.setItem("groceryAppData", JSON.stringify(dataToSave));
	}, [lists, activeListId, showStock, hasLoaded]);

	function addItem() {
		if (!product.trim()) return;

		const newItem = {
			id: Date.now(),
			product,
			brand,
			category,
			quantity: 1,
			stock: 0,
			inCart: false,
		};

		updateActiveList((list) => ({
			...list,
			items: [...list.items, newItem],
		}));

		setProduct("");
		setBrand("");
	}
	function increaseQuantity(id) {
		const updatedItems = items.map((item) =>
			item.id === id ? { ...item, quantity: item.quantity + 1 } : item
		);

		updateActiveList((list) => ({
			...list,
			items: list.items.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item
			),
		}));
	}

	function decreaseQuantity(id) {
		const updatedItems = items.map((item) =>
			item.id === id && item.quantity > 1
				? { ...item, quantity: item.quantity - 1 }
				: item
		);

		updateActiveList((list) => ({
			...list,
			items: list.items.map((item) =>
				item.id === id && item.quantity > 1
					? { ...item, quantity: item.quantity - 1 }
					: item
			),
		}));
	}
	function removeItem(id) {
		const updatedItems = items.filter((item) => item.id !== id);
		updateActiveList((list) => ({
			...list,
			items: list.items.filter((item) => item.id !== id),
		}));
	}
	const visibleItems =
		activeCategory === "All"
			? items
			: items.filter((item) => item.category === activeCategory);

	const sortedItems = [...visibleItems].sort(
		(a, b) => Number(a.inCart) - Number(b.inCart)
	);
	function addCategory() {
		const trimmed = newCategory.trim();

		if (!trimmed) return;
		if (categories.includes(trimmed)) return;

		updateActiveList((list) => ({
			...list,
			categories: [...list.categories, trimmed],
		}));
		setNewCategory("");
	}
	function removeCategory(categoryToRemove) {
		updateActiveList((list) => ({
			...list,
			categories: list.categories.filter((c) => c !== categoryToRemove),
			activeCategory:
				list.activeCategory === categoryToRemove ? "All" : list.activeCategory,
		}));

		if (activeCategory === categoryToRemove) {
			setActiveCategory("All");
		}
	}
	function toggleInCart(id) {
		const updatedItems = items.map((item) =>
			item.id === id ? { ...item, inCart: !item.inCart } : item
		);

		updateActiveList((list) => ({
			...list,
			items: list.items.map((item) =>
				item.id === id ? { ...item, inCart: !item.inCart } : item
			),
		}));
	}
	const notInCartItems = sortedItems.filter((item) => !item.inCart);

	const inCartItems = sortedItems.filter((item) => item.inCart);
	function increaseStock(id) {
		updateActiveList((list) => ({
			...list,
			items: list.items.map((item) =>
				item.id === id ? { ...item, stock: (item.stock || 0) + 1 } : item
			),
		}));
	}

	function decreaseStock(id) {
		updateActiveList((list) => ({
			...list,
			items: list.items.map((item) =>
				item.id === id
					? { ...item, stock: Math.max((item.stock || 0) - 1, 0) }
					: item
			),
		}));
	}
	function createNewList() {
		const newList = {
			id: Date.now(),
			name: `List ${lists.length + 1}`,
			items: [],
			categories: ["All", "Fruits", "Vegetables", "Dairy", "Snacks"],
			activeCategory: "All",
		};

		setLists((prev) => [...prev, newList]);
		setActiveListId(newList.id);
	}
	function saveListName(id) {
		const trimmed = listNameInput.trim();
		if (!trimmed) return;

		setLists((prev) =>
			prev.map((list) => (list.id === id ? { ...list, name: trimmed } : list))
		);

		setEditingListId(null);
		setListNameInput("");
	}
	function deleteList(id) {
		if (lists.length === 1) return;

		const updatedLists = lists.filter((list) => list.id !== id);

		setLists(updatedLists);

		if (activeListId === id) {
			setActiveListId(updatedLists[0].id);
		}
	}
	function clearInCartItems() {
		updateActiveList((list) => ({
			...list,
			items: list.items.filter((item) => !item.inCart),
		}));
	}

	return (
		<div className="app">
			<header className="header">
				<h1>🛒 Grocery List</h1>
			</header>

			<main className="main">
				<div className="sidebar">
					<div className="lists">
						{lists.map((list) => (
							<div
								key={list.id}
								className={`category ${
									activeListId === list.id ? "active" : ""
								}`}
								onClick={() => {
									if (editingListId !== list.id) {
										setActiveListId(list.id);
									}
								}}
								onDoubleClick={() => {
									setEditingListId(list.id);
									setListNameInput(list.name);
								}}
							>
								{editingListId === list.id ? (
									<input
										className="list-rename-input"
										value={listNameInput}
										onChange={(e) => setListNameInput(e.target.value)}
										onBlur={() => saveListName(list.id)}
										onKeyDown={(e) => {
											if (e.key === "Enter") saveListName(list.id);
											if (e.key === "Escape") setEditingListId(null);
										}}
										autoFocus
									/>
								) : (
									<>
										<span className="category-name">{list.name}</span>

										{lists.length > 1 && (
											<button
												className="delete-category"
												onClick={(e) => {
													e.stopPropagation();
													deleteList(list.id);
												}}
											>
												✕
											</button>
										)}
									</>
								)}
							</div>
						))}

						<div className="category add-list" onClick={createNewList}>
							<span className="category-name">＋ List</span>
						</div>
					</div>

					<div className="categories">
						{categories.map((cat) => (
							<div
								key={cat}
								className={`category ${activeCategory === cat ? "active" : ""}`}
								onClick={() =>
									updateActiveList((list) => ({
										...list,
										activeCategory: cat,
									}))
								}
							>
								<span className="category-name">{cat}</span>

								{cat !== "All" && (
									<button
										className="delete-category"
										onClick={(e) => {
											e.stopPropagation();
											removeCategory(cat);
										}}
									>
										✕
									</button>
								)}
							</div>
						))}
						<div
							className={`category pill-toggle ${showStock ? "active" : ""}`}
							onClick={() => setShowStock(!showStock)}
						>
							<span className="category-name">Stock</span>
						</div>
					</div>
				</div>
				<div className="add-category">
					<input
						type="text"
						placeholder="New category"
						value={newCategory}
						onChange={(e) => setNewCategory(e.target.value)}
					/>

					<button onClick={addCategory}>+</button>
				</div>
				<div className="content">
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
							<select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<option>Fruits</option>
								<option>Vegetables</option>
								<option>Dairy</option>
								<option>Snacks</option>
							</select>
						</div>

						<button className="add-button" onClick={addItem}>
							+ Add Item
						</button>
					</div>
					<div className="items">
						{notInCartItems.map((item) => (
							<div
								className={`item ${item.inCart ? "in-cart" : ""}`}
								key={item.id}
							>
								<input
									type="checkbox"
									checked={item.inCart}
									onChange={() => toggleInCart(item.id)}
								/>

								<div className="item-info">
									<strong>{item.product}</strong>
									{item.brand && <span className="brand">{item.brand}</span>}
								</div>

								<div className="item-actions">
									{showStock && (
										<div className="quantity stock">
											<span className="label">Home</span>
											<button onClick={() => decreaseStock(item.id)}>-</button>
											<span>{item.stock || 0}</span>
											<button onClick={() => increaseStock(item.id)}>+</button>
										</div>
									)}
									<div className="quantity">
										<button onClick={() => decreaseQuantity(item.id)}>-</button>
										<span>{item.quantity}</span>
										<button onClick={() => increaseQuantity(item.id)}>+</button>
									</div>

									<button
										className="remove"
										onClick={() => removeItem(item.id)}
									>
										✕
									</button>
								</div>
							</div>
						))}

						{inCartItems.length > 0 && (
							<>
								<div className="clear-cart">
									<button onClick={clearInCartItems}>
										Clear in-cart items
									</button>
								</div>

								<div className="divider">In cart</div>
							</>
						)}

						{inCartItems.map((item) => (
							<div
								className={`item ${item.inCart ? "in-cart" : ""}`}
								key={item.id}
							>
								<input
									type="checkbox"
									checked={item.inCart}
									onChange={() => toggleInCart(item.id)}
								/>

								<div className="item-info">
									<strong>{item.product}</strong>
									{item.brand && <span className="brand">{item.brand}</span>}
								</div>

								<div className="item-actions">
									<div className="quantity">
										<button onClick={() => decreaseQuantity(item.id)}>-</button>
										<span>{item.quantity}</span>
										<button onClick={() => increaseQuantity(item.id)}>+</button>
									</div>

									<button
										className="remove"
										onClick={() => removeItem(item.id)}
									>
										✕
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</main>
		</div>
	);
}

export default App;

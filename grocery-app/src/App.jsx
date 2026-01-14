import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListsBar from "./components/ListsBar";
import CategoryManager from "./components/CategoryManager";
import AddItemForm from "./components/AddItemForm";
import ItemsList from "./components/ItemsList";
import AddCategoryForm from "./components/AddCategoryForm";
import RecipePicker from "./components/RecipePicker";

function App() {
	const [product, setProduct] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("Fruits");
	const [recipes, setRecipes] = useState([]);
	const [lists, setLists] = useState([]);
	const [activeListId, setActiveListId] = useState(null);
	const [newCategory, setNewCategory] = useState("");
	const [hasLoaded, setHasLoaded] = useState(false);
	const [showStock, setShowStock] = useState(true);

	const activeList = lists.find((list) => list.id === activeListId);
	const items = activeList?.items || [];
	const categories = activeList?.categories || ["All"];
	const activeCategory = activeList?.activeCategory || "All";
	const [editingListId, setEditingListId] = useState(null);
	const [listNameInput, setListNameInput] = useState("");
	const getInitialTheme = () => {
		const saved = localStorage.getItem("theme");
		if (saved) return saved;

		return window.matchMedia("(prefers-color-scheme: dark)").matches
			? "dark"
			: "light";
	};
	const [theme, setTheme] = useState(getInitialTheme);
	const toggleTheme = () => {
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

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
			if (parsed.recipes) {
				setRecipes(parsed.recipes);
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
			recipes,
		};

		localStorage.setItem("groceryAppData", JSON.stringify(dataToSave));
	}, [lists, activeListId, showStock, hasLoaded, recipes]);

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
	useEffect(() => {
		localStorage.setItem("theme", theme);
	}, [theme]);
	useEffect(() => {
		const media = window.matchMedia("(prefers-color-scheme: dark)");

		const handler = (e) => {
			const saved = localStorage.getItem("theme");
			if (saved) return;
			setTheme(e.matches ? "dark" : "light");
		};

		media.addEventListener("change", handler);
		return () => media.removeEventListener("change", handler);
	}, []);
	function addRecipeToList(recipe) {
		updateActiveList((list) => {
			const newItems = recipe.ingredients.map((ing) => ({
				id: Date.now() + Math.random(),
				product: ing.product,
				brand: "",
				category: ing.category || "Other",
				quantity: ing.quantity || 1,
				stock: 0,
				inCart: false,
			}));

			return {
				...list,
				items: [...list.items, ...newItems],
			};
		});
	}

	return (
		<div className={`app ${theme === "dark" ? "dark" : ""}`}>
			<Header />

			<main className="main">
				<div className="sidebar">
					<ListsBar
						lists={lists}
						activeListId={activeListId}
						onSelectList={setActiveListId}
						onCreateList={createNewList}
						onDeleteList={deleteList}
						onRenameList={saveListName}
						editingListId={editingListId}
						setEditingListId={setEditingListId}
						listNameInput={listNameInput}
						setListNameInput={setListNameInput}
					/>

					<CategoryManager
						categories={categories}
						activeCategory={activeCategory}
						onSelectCategory={(cat) =>
							updateActiveList((list) => ({
								...list,
								activeCategory: cat,
							}))
						}
						onRemoveCategory={removeCategory}
						showStock={showStock}
						onToggleStock={() => setShowStock(!showStock)}
						theme={theme}
						onToggleTheme={toggleTheme}
					/>
				</div>
				<RecipePicker
					recipes={recipes}
					onAddRecipe={addRecipeToList}
					onCreateRecipe={() => setShowRecipeCreator(true)}
				/>
				<AddCategoryForm
					value={newCategory}
					onChange={setNewCategory}
					onAdd={addCategory}
				/>
				<div className="content">
					<AddItemForm
						product={product}
						setProduct={setProduct}
						brand={brand}
						setBrand={setBrand}
						category={category}
						setCategory={setCategory}
						categories={categories}
						onAddItem={addItem}
					/>
					<ItemsList
						notInCartItems={notInCartItems}
						inCartItems={inCartItems}
						showStock={showStock}
						onToggleInCart={toggleInCart}
						onIncreaseQty={increaseQuantity}
						onDecreaseQty={decreaseQuantity}
						onRemoveItem={removeItem}
						onIncreaseStock={increaseStock}
						onDecreaseStock={decreaseStock}
						onClearInCart={clearInCartItems}
					/>
				</div>
			</main>
		</div>
	);
}

export default App;

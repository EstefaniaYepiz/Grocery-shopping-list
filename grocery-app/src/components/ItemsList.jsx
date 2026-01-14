function ItemsList({
	notInCartItems,
	inCartItems,
	showStock,
	onToggleInCart,
	onIncreaseQty,
	onDecreaseQty,
	onRemoveItem,
	onIncreaseStock,
	onDecreaseStock,
	onClearInCart,
}) {
	return (
		<div className="items">
			{notInCartItems.map((item) => (
				<div key={item.id} className={`item ${item.inCart ? "in-cart" : ""}`}>
					<input
						type="checkbox"
						checked={item.inCart}
						onChange={() => onToggleInCart(item.id)}
					/>

					<div className="item-info">
						<strong>{item.product}</strong>
						{item.brand && <span className="brand">{item.brand}</span>}
					</div>

					<div className="item-actions">
						{showStock && (
							<div className="quantity stock">
								<span className="label">Home</span>
								<button onClick={() => onDecreaseStock(item.id)}>-</button>
								<span>{item.stock || 0}</span>
								<button onClick={() => onIncreaseStock(item.id)}>+</button>
							</div>
						)}

						<div className="quantity">
							<button onClick={() => onDecreaseQty(item.id)}>-</button>
							<span>{item.quantity}</span>
							<button onClick={() => onIncreaseQty(item.id)}>+</button>
						</div>

						<button className="remove" onClick={() => onRemoveItem(item.id)}>
							✕
						</button>
					</div>
				</div>
			))}

			{inCartItems.length > 0 && (
				<>
					<div className="clear-cart">
						<button onClick={onClearInCart}>Clear in-cart items</button>
					</div>

					<div className="divider">In cart</div>
				</>
			)}

			{inCartItems.map((item) => (
				<div key={item.id} className={`item in-cart`}>
					<input
						type="checkbox"
						checked={item.inCart}
						onChange={() => onToggleInCart(item.id)}
					/>

					<div className="item-info">
						<strong>{item.product}</strong>
						{item.brand && <span className="brand">{item.brand}</span>}
					</div>

					<div className="item-actions">
						<div className="quantity">
							<button onClick={() => onDecreaseQty(item.id)}>-</button>
							<span>{item.quantity}</span>
							<button onClick={() => onIncreaseQty(item.id)}>+</button>
						</div>

						<button className="remove" onClick={() => onRemoveItem(item.id)}>
							✕
						</button>
					</div>
				</div>
			))}
		</div>
	);
}

export default ItemsList;

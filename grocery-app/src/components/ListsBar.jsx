function ListsBar({
	lists,
	activeListId,
	onSelectList,
	onCreateList,
	onDeleteList,
	onRenameList,
	editingListId,
	setEditingListId,
	listNameInput,
	setListNameInput,
}) {
	return (
		<div className="lists">
			{lists.map((list) => (
				<div
					key={list.id}
					className={`category ${activeListId === list.id ? "active" : ""}`}
					onClick={() => {
						if (editingListId !== list.id) onSelectList(list.id);
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
							onBlur={() => onRenameList(list.id)}
							onKeyDown={(e) => {
								if (e.key === "Enter") onRenameList(list.id);
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
										onDeleteList(list.id);
									}}
								>
									✕
								</button>
							)}
						</>
					)}
				</div>
			))}

			<div className="category add-list" onClick={onCreateList}>
				<span className="category-name">＋ List</span>
			</div>
		</div>
	);
}

export default ListsBar;

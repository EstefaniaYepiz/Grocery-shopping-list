function ListsSidebar({
	lists,
	activeListId,
	editingListId,
	listNameInput,
	onSelectList,
	onStartRename,
	onChangeName,
	onSaveName,
	onCancelRename,
	onCreateList,
	onDeleteList,
}) {
	return (
		<div className="lists">
			{lists.map((list) => (
				<div
					key={list.id}
					className={`category ${activeListId === list.id ? "active" : ""}`}
					onClick={() => onSelectList(list.id)}
					onDoubleClick={() => onStartRename(list)}
				>
					{editingListId === list.id ? (
						<input
							className="list-rename-input"
							value={listNameInput}
							onChange={(e) => onChangeName(e.target.value)}
							onBlur={() => onSaveName(list.id)}
							onKeyDown={(e) => {
								if (e.key === "Enter") onSaveName(list.id);
								if (e.key === "Escape") onCancelRename();
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

export default ListsSidebar;

const listController = (() => {
	// CODE FOR THE DATA STRUCTURE
	class List {
		constructor(id, title) {
			this.id = id;
			this.title = title;
			this.todos = [];
		}
	}

	const data = {
		allLists: []
	};
	// ===== PUBLIC =====
	const addListItem = (title) => {
		// 1. Create ID
		let ID = 0;
		if (data.allLists.length > 0) {
			ID = data.allLists[data.allLists.length - 1].id + 1;
		}
		// 2. Create newListItem
		const newListItem = new List(ID, title);

		// 3. Add newlistItem to data structure
		data.allLists.push(newListItem);

		// 4. Return new item
		return newListItem;
	};
	const deleteListItem = (id) => {
		const ids = data.allLists.map((list) => {
			return list.id;
		});
		// find index of id in array of ids
		const index = ids.indexOf(id);
		// Remove list from data-structure
		if (index !== -1) {
			data.allLists.splice(index, 1);
		}
		console.log(data.allLists);
	};

	const getList = (id) => {
		const ids = data.allLists.map((list) => {
			return list.id;
		});
		const index = ids.indexOf(id);
		return data.allLists[index];
	};

	return { addListItem, deleteListItem, getList };
})();

export default listController;

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

	return { addListItem };
})();

export default listController;

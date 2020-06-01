const listController = (() => {
	// CODE FOR THE DATA STRUCTURE
	class List {
		constructor(id, title) {
			this.id = id;
			this.title = title;
			this.todos = [];
		}
	}
	class Todo {
		constructor(id, title, date, priority, description) {
			this.id = id;
			this.title = title;
			this.date = date;
			this.priority = priority;
			this.description = description;
			this.done = false;
		}
	}

	const data = {
		allLists: []
	};
	const populateStorage = () => {
		console.log('Local Storage: ', data.allLists);
		localStorage.setItem('allLists', JSON.stringify(data.allLists));
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
		populateStorage();
		// 4. Return new item
		return newListItem;
	};
	const addTodoItem = (obj) => {
		// 1. Get todoListID
		const todoListID = parseInt(obj.listID[obj.listID.length - 1]);
		// 2. Get List obj where todos will be added
		const targetList = getList(todoListID);
		// 3. Create todoID
		let todoID = 0;
		if (targetList.todos.length > 0) {
			todoID = targetList.todos[targetList.todos.length - 1].id + 1;
		}
		// 4. Create Todo obj
		const newTodoItem = new Todo(todoID, obj.title, obj.date, obj.prio, obj.desc);
		// 5. Push Todo into List
		targetList.todos.push(newTodoItem);
		console.log('List where todo was added: ', targetList);
		populateStorage();
		// 6 Return new Todo item
		return newTodoItem;
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
		populateStorage();
		let diffIndex = index;
		if (data.allLists.length === 0) {
			// if no items on list
			return -1;
		} else {
			if (diffIndex === data.allLists.length) {
				//  if last item
				diffIndex--;
			}
			return data.allLists[diffIndex];
		}
	};
	const deleteTodoItem = (listID, todoID) => {
		// get list from where the todo is going to be deleted
		const targetList = getList(listID);
		// find index of todo to be deleted
		const ids = targetList.todos.map((todo) => {
			return todo.id;
		});
		const index = ids.indexOf(todoID);
		if (index !== -1) {
			// remove todo from data structure
			targetList.todos.splice(index, 1);
		}
		populateStorage();
		console.log('List after deleting todo: ', targetList);
	};
	const toggleDone = (listID, todoID, isDone) => {
		// 1. get list
		const targetList = getList(listID);

		// 2. find todo index
		const ids = targetList.todos.map((todo) => {
			return todo.id;
		});
		const index = ids.indexOf(todoID);
		// 3. toggle .done in todo
		targetList.todos[index].done = isDone;
		populateStorage();
		// 4. return updated todo
		console.log('List after toggling done: ', targetList);
	};
	const editTodoItem = (listID, todoID, obj) => {
		const todoToEdit = getTodo(listID, todoID);
		todoToEdit.title = obj.title;
		todoToEdit.date = obj.date;
		todoToEdit.priority = obj.prio;
		todoToEdit.description = obj.desc;
		populateStorage();
	};

	const getList = (id) => {
		const ids = data.allLists.map((list) => {
			return list.id;
		});
		const index = ids.indexOf(id);
		return data.allLists[index];
	};
	const getTodo = (listID, todoID) => {
		// 1. get list
		const targetList = getList(listID);

		// 2. find todo index
		const ids = targetList.todos.map((todo) => {
			return todo.id;
		});
		const index = ids.indexOf(todoID);
		// 3. return todo
		return targetList.todos[index];
	};
	const getDefaultList = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const defaultTodo = new Todo(
			0,
			'Click Here to check details',
			`${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`,
			'high',
			'Edit your todos by clicking on the pencil icon.'
		);
		const defaultList = new List(0, 'Get Started');
		defaultList.todos.push(defaultTodo);
		data.allLists.push(defaultList);
		return defaultList;
	};
	const getStorage = () => {
		if (!localStorage.getItem('allLists')) {
			populateStorage();
		}
		data.allLists = JSON.parse(localStorage.getItem('allLists'));
		return data.allLists;
	};

	return {
		addListItem,
		deleteListItem,
		getList,
		getTodo,
		addTodoItem,
		deleteTodoItem,
		editTodoItem,
		toggleDone,
		getDefaultList,
		getStorage
	};
})();

export default listController;

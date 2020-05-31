import './main.scss';
import listController from './app/listController';
import uiController from './app/uiController';

const controller = ((listCtrl, uiCtrl) => {
	// APP CONTROLLER
	// Initilize Event Listeners
	const DOM = uiCtrl.getDOMStrings();
	const setupEventListeners = () => {
		//  Add event handler for LISTS
		document.querySelector(DOM.addListBtn).addEventListener('click', ctrlAddListItem);
		document.querySelector(DOM.list).addEventListener('click', ctrlDeleteListItem);
		document.querySelector(DOM.list).addEventListener('click', ctrlSetupTodos);
		document.querySelector(DOM.addTodoBtn).addEventListener('click', ctrlAddTodoItem);
		document.querySelector(DOM.todo).addEventListener('click', ctrlDeleteTodoItem);
		document.querySelector(DOM.todo).addEventListener('click', ctrlToggleHide);
		document.querySelector(DOM.todo).addEventListener('click', ctrlToggleDone);
		document.querySelector(DOM.todo).addEventListener('click', ctrlSetupEdit);
		document.querySelector(DOM.editTodo).addEventListener('click', ctrlEditTodoItem);
	};
	// Add item to list
	const ctrlAddListItem = () => {
		// 1. Get input data from lists field
		const listInput = uiCtrl.getListInput();
		if (listInput) {
			// 2. Add new item to data-structure
			const newListItem = listCtrl.addListItem(listInput);
			console.log(newListItem);

			// 3. Add new item to the lists ui
			uiCtrl.addListItem(newListItem);

			// 4. Clear list field
			uiCtrl.clearListField();

			// 5. Setup list after adding it
			uiCtrl.setupTodos(newListItem);
		}
	};

	const ctrlDeleteListItem = (event) => {
		const listItemID = event.target.parentNode.parentNode.id;
		if (listItemID) {
			const ID = parseInt(listItemID[listItemID.length - 1]);
			console.log(ID);
			// 1. Delete item from data-structure
			listCtrl.deleteListItem(ID);
			// 2. Delete item from UI
			uiCtrl.deleteItem(listItemID);
		}
	};
	const ctrlSetupTodos = (event) => {
		const listItemID = event.target.parentNode.id;
		if (listItemID) {
			const ID = parseInt(listItemID[listItemID.length - 1]);
			console.log('Setting up', event.target.parentNode.id);
			//  LIST CONTROLLER TASKS
			// 1. Set this.selected  to false to all lists  ===  setSelected(id) => {}
			// 2. Set this.selected to true to event.target using ID

			// 3. Get targetList with id --- getList(ID) -> return data.allLists[index]
			const targetList = listCtrl.getList(ID);
			console.log('target List', targetList);

			// UI CONTROLLER TASKS
			// 3. Set title for '.container__todo__title' with title from targetList.title
			// 5. Add'selected' class to event.target and remove from other list items
			// 6. Add todo-list-ID to '.todo'
			uiCtrl.setupTodos(targetList);
		}
	};

	const ctrlAddTodoItem = () => {
		// 1. Get input values
		const todoInput = uiCtrl.getTodoInput();
		if (todoInput.listID && todoInput.title) {
			console.log('todo input: ', todoInput);
			// 2. Add todo item to data-strucuture
			const newTodoItem = listCtrl.addTodoItem(todoInput);
			// 3. Add todo item to the todos ui
			uiCtrl.addTodoItem(newTodoItem);
			// 4. Clear fields
			uiCtrl.clearTodoFields();
		}
	};
	const ctrlDeleteTodoItem = (event) => {
		// Find todo id and list id
		const deleteBtn = event.target.parentNode;
		const todoItemID = event.target.parentNode.parentNode.parentNode.id;
		const listItemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		if (listItemID && todoItemID && deleteBtn.className === DOM.todoItemDeleteBtnClass) {
			console.log('trying to delete ', todoItemID, 'from ', listItemID);
			const todoID = parseInt(todoItemID[todoItemID.length - 1]);
			const listID = parseInt(listItemID[listItemID.length - 1]);
			// 1. Delete item from data-structure
			listCtrl.deleteTodoItem(listID, todoID);
			// 2. Delete item from UI
			uiCtrl.deleteItem(todoItemID);
		}
	};
	const ctrlSetupEdit = (event) => {
		// Find todo id and list id
		const editBtn = event.target.parentNode;
		if (editBtn.className === DOM.todoItemEditBtnClass) {
			const todoItemID = event.target.parentNode.parentNode.parentNode.id;
			const listItemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
			if (listItemID && todoItemID) {
				console.log('trying to EDIT ', todoItemID, 'from ', listItemID);
				const todoID = parseInt(todoItemID[todoItemID.length - 1]);
				const listID = parseInt(listItemID[listItemID.length - 1]);
				// 1. Get todo from data-structure
				const oldTodo = listCtrl.getTodo(listID, todoID);
				console.log('todo to Edit: ', oldTodo);
				// 2. Set todo values from in container__edit
				uiCtrl.setEditInputs(listID, todoID, oldTodo);
				// 3. Show container__edit
				const containerEdit = document.querySelector(DOM.containerEdit);
				uiCtrl.toggleHide(containerEdit);
			}
		}
	};
	const ctrlEditTodoItem = (event) => {
		const editTodoBtn = event.target;
		if (editTodoBtn.className === DOM.editTodoBtnClass) {
			// 4. Get edited input from container__edit
			const editInput = uiCtrl.getEditInput();
			console.log(editInput);
			// 5. Edit item from data-structure
			listCtrl.editTodoItem(editInput);
			// 6. Update item from UI
			// 7. Clear input fields and hide container__edit
		}
	};
	const ctrlToggleDone = (event) => {
		const isChecked = event.target.checked;
		const todoItemID = event.target.parentNode.parentNode.id;
		const listItemID = event.target.parentNode.parentNode.parentNode.id;
		if (isChecked === true || isChecked === false) {
			const todoID = parseInt(todoItemID[todoItemID.length - 1]);
			const listID = parseInt(listItemID[listItemID.length - 1]);
			console.log('DONE: ', isChecked, todoItemID, listItemID);
			// 1. Update data-structure
			listCtrl.toggleDone(listID, todoID, isChecked);
			// 2. Update item in UI
			// Might need to make a separate updateTodo()
			const updatedList = listCtrl.getList(listID);
			uiCtrl.setupTodos(updatedList);
		}
	};
	const ctrlToggleHide = (event) => {
		const extra = event.target.parentNode.nextSibling;
		if (event.target.className === DOM.todoItemTitleClass) {
			uiCtrl.toggleHide(extra);
		}
	};

	const init = () => {
		console.log('Application has started');
		setupEventListeners();
	};

	return { init };
})(listController, uiController);

controller.init();

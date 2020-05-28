import './main.scss';
import listController from './app/listController';
import uiController from './app/uiController';

const controller = ((listCtrl, uiCtrl) => {
	// APP CONTROLLER
	// Initilize Event Listeners
	const setupEventListeners = () => {
		const DOM = uiCtrl.getDOMStrings();
		//  Add event handler for LISTS
		document.querySelector(DOM.addListBtn).addEventListener('click', ctrlAddListItem);
		document.querySelector(DOM.list).addEventListener('click', ctrlDeleteListItem);
		document.querySelector(DOM.list).addEventListener('click', ctrlSetupTodos);
		document.querySelector(DOM.addTodoBtn).addEventListener('click', ctrlAddTodoItem);
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
			uiCtrl.deleteListItem(listItemID);
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
		console.log('HI I WILL BE ABLE TO ADD TODO ITEMS');
		// 1. Get input values
		// 2. Add todo item to data-strucuture
		// 3. Add todo item to the todos ui
		// 4. Clear fields
	};

	const init = () => {
		console.log('Application has started');
		setupEventListeners();
	};

	return { init };
})(listController, uiController);

controller.init();

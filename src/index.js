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

	const init = () => {
		console.log('Application has started');
		setupEventListeners();
	};

	return { init };
})(listController, uiController);

controller.init();

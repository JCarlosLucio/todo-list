import './main.scss';
import listController from './app/listController';
import uiController from './app/uiController';

const controller = ((listCtrl, uiCtrl) => {
	// APP CONTROLLER

	// Add item to list
	const ctrlAddListItem = () => {
		// 1. Get input data from lists field
		const listInput = uiCtrl.getListInput();
		console.log(listInput);
		// 2. Add new item to data-structure

		// 3. Add new item to the lists ui
	};

	// Initilize Event Listeners
	const setupEventListeners = () => {
		const DOM = uiCtrl.getDOMStrings();
		//  Add event handler for LISTS
		document.querySelector(DOM.addListBtn).addEventListener('click', ctrlAddListItem);
	};

	return { setupEventListeners };
})(listController, uiController);

controller.setupEventListeners();

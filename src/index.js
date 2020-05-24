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
	};
	// Add item to list
	const ctrlAddListItem = () => {
		// 1. Get input data from lists field
		const listInput = uiCtrl.getListInput();
		console.log(listInput);
		// 2. Add new item to data-structure

		// 3. Add new item to the lists ui
	};

	const init = () => {
		console.log('Application has started');
		setupEventListeners();
	};

	return { init };
})(listController, uiController);

controller.init();

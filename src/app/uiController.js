const uiController = (() => {
	//  CODE FOR THE UI
	const DOMStrings = {
		addListBtn: '.add__list__btn',
		addListTitle: '.add__list__title'
	};
	// ===== PUBLIC =====
	const getListInput = () => {
		const listTitle = document.querySelector(DOMStrings.addListTitle).value;
		return listTitle;
	};
	const getDOMStrings = () => {
		return DOMStrings;
	};

	return { getDOMStrings, getListInput };
})();
export default uiController;

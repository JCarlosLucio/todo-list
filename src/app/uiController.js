const uiController = (() => {
	//  CODE FOR THE UI
	const DOMStrings = {
		addListBtn: '.add__list__btn'
	};

	const getDOMStrings = () => {
		return DOMStrings;
	};

	return { getDOMStrings };
})();
export default uiController;

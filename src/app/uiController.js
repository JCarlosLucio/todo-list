const uiController = (() => {
	//  CODE FOR THE UI
	const DOMStrings = {
		addListBtn: '.add__list__btn',
		addListTitle: '.add__list__title',
		list: '.list'
	};
	// ===== PUBLIC =====
	const getListInput = () => {
		const listTitle = document.querySelector(DOMStrings.addListTitle).value;
		return listTitle;
	};
	const getDOMStrings = () => {
		return DOMStrings;
	};

	const addListItem = function(obj) {
		// create list item
		const listItemDiv = document.createElement('div');
		const titleDiv = document.createElement('div');
		const trashIcon = document.createElement('i');
		const deleteBtn = document.createElement('button');
		listItemDiv.classList.add('list__item');
		listItemDiv.setAttribute('id', `list-${obj.id}`);
		titleDiv.classList.add('list__item__title');
		titleDiv.innerText = obj.title;
		trashIcon.classList.add('fas', 'fa-trash-alt');
		deleteBtn.classList.add('list__item__delete__btn');
		deleteBtn.append(trashIcon);
		listItemDiv.append(titleDiv, deleteBtn);

		// Append list item to lists
		const list = document.querySelector(DOMStrings.list);
		list.append(listItemDiv);
	};
	const deleteListItem = (selectorID) => {
		const el = document.getElementById(selectorID);
		el.parentNode.removeChild(el);
	};

	const clearListField = () => {
		const listTitle = document.querySelector(DOMStrings.addListTitle);
		listTitle.value = '';
		listTitle.focus();
	};

	return { getDOMStrings, getListInput, addListItem, deleteListItem, clearListField };
})();
export default uiController;

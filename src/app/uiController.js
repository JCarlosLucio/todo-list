const uiController = (() => {
	//  CODE FOR THE UI
	const DOMStrings = {
		// For querySelector
		addListBtn: '.add__list__btn',
		addListTitle: '.add__list__title',
		list: '.list',
		containerTodoTitle: '.container__todo__title',
		listItem: '.list__item',
		todo: '.todo',
		addTodoBtn: '.add__todo__btn',
		addTodoTitle: '.add__todo__title',
		addTodoDate: '.add__todo__date',
		addTodoPrio: '.add__todo__prio',
		addTodoDesc: '.add__todo__desc',
		// For element creation
		listItemClass: 'list__item',
		listItemTitleClass: 'list__item__title',
		listItemDeleteBtnClass: 'list__item__delete__btn',
		todoItemClass: 'todo__item',
		todoItemShortClass: 'todo__item__short',
		todoItemCheckbox: 'todo__item__checkbox',
		todoItemTitleClass: 'todo__item__title',
		todoItemDeleteBtnClass: 'todo__item__delete__btn',
		todoItemExtraClass: 'todo__item__extra',
		todoItemDateClass: 'todo__item__date',
		todoItemDescClass: 'todo__item__desc'
	};
	// ===== PUBLIC =====
	const getListInput = () => {
		const listTitle = document.querySelector(DOMStrings.addListTitle).value;
		return listTitle;
	};
	const getTodoInput = () => {
		const listID = document.querySelector(DOMStrings.todo).id;
		const title = document.querySelector(DOMStrings.addTodoTitle).value;
		const date = document.querySelector(DOMStrings.addTodoDate).value;
		const prio = document.querySelector(DOMStrings.addTodoPrio).value;
		const desc = document.querySelector(DOMStrings.addTodoDesc).value;
		return { listID, title, date, prio, desc };
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
		listItemDiv.classList.add(DOMStrings.listItemClass);
		listItemDiv.setAttribute('id', `list-${obj.id}`);
		titleDiv.classList.add(DOMStrings.listItemTitleClass);
		titleDiv.innerText = obj.title;
		trashIcon.classList.add('fas', 'fa-trash-alt');
		deleteBtn.classList.add(DOMStrings.listItemDeleteBtnClass);
		deleteBtn.append(trashIcon);
		listItemDiv.append(titleDiv, deleteBtn);

		// Append list item to lists
		const list = document.querySelector(DOMStrings.list);
		list.append(listItemDiv);
	};
	const addTodoItem = function(obj) {
		// 1. Create todo item
		const todoItemDiv = document.createElement('div');
		const shortDiv = document.createElement('div');
		const checkbox = document.createElement('input');
		const titleDiv = document.createElement('div');
		const deleteBtn = document.createElement('button');
		const trashIcon = document.createElement('i');
		const extraDiv = document.createElement('div');
		const date = document.createElement('div');
		const desc = document.createElement('div');
		// 2. Add attributes
		todoItemDiv.classList.add(DOMStrings.todoItemClass);
		todoItemDiv.setAttribute('id', `todo-${obj.id}`);
		todoItemDiv.classList.add(obj.priority);
		shortDiv.classList.add(DOMStrings.todoItemShortClass);
		checkbox.type = 'checkbox';
		checkbox.classList.add(DOMStrings.todoItemCheckbox);
		titleDiv.classList.add(DOMStrings.todoItemTitleClass);
		titleDiv.innerText = obj.title;
		trashIcon.classList.add('fas', 'fa-trash-alt');
		deleteBtn.classList.add(DOMStrings.todoItemDeleteBtnClass);
		deleteBtn.append(trashIcon);
		shortDiv.append(checkbox, titleDiv, deleteBtn);
		extraDiv.classList.add(DOMStrings.todoItemExtraClass);
		date.classList.add(DOMStrings.todoItemDateClass);
		date.innerText = obj.date;
		desc.classList.add(DOMStrings.todoItemDescClass);
		desc.innerText = obj.description;
		extraDiv.append(date, desc);
		todoItemDiv.append(shortDiv, extraDiv);
		// 3. Append todo item to todos
		const todo = document.querySelector(DOMStrings.todo);
		todo.append(todoItemDiv);
	};

	const deleteItem = (selectorID) => {
		const el = document.getElementById(selectorID);
		el.parentNode.removeChild(el);
	};

	const clearListField = () => {
		const listTitle = document.querySelector(DOMStrings.addListTitle);
		listTitle.value = '';
		listTitle.focus();
	};
	const clearTodoFields = () => {
		const todoTitle = document.querySelector(DOMStrings.addTodoTitle);
		todoTitle.value = '';
		todoTitle.focus();
	};

	const setupTodos = (obj) => {
		// 1. Set title for '.container__todo__title' with title from targetList.title
		const containerTodoTitle = document.querySelector(DOMStrings.containerTodoTitle);
		containerTodoTitle.innerText = obj.title;

		// 2. Remove 'selected' class from all '.list_item'
		const listItems = document.querySelectorAll(DOMStrings.listItem);
		listItems.forEach((item) => {
			item.classList.remove('selected');
		});

		// 3. Add 'selected' class to event.target
		const targetListItem = document.getElementById(`list-${obj.id}`);
		targetListItem.classList.add('selected');

		// 5. Update/Add todo-list-ID in '.todo'
		const todoCont = document.querySelector(DOMStrings.todo);
		todoCont.id = `todo-list-${obj.id}`;

		// 6. Erase todos from '.todo' - ui
		todoCont.textContent = '';
		// 7. Render todos - ui
		for (const todo of obj.todos) {
			addTodoItem(todo);
		}
	};

	return {
		getDOMStrings,
		getListInput,
		addListItem,
		deleteItem,
		clearListField,
		setupTodos,
		getTodoInput,
		addTodoItem,
		clearTodoFields
	};
})();
export default uiController;

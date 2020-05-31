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
		containerEdit: '.container__edit',
		editTodo: '.edit__todo',
		editTodoTitle: '.edit__todo__title',
		editTodoBtn: '.edit__todo__btn',
		editTodoDate: '.edit__todo__date',
		editTodoPrio: '.edit__todo__prio',
		editTodoDesc: '.edit__todo__desc',
		containerEditTitle: '.container__edit__title',
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
		todoItemEditBtnClass: 'todo__item__edit__btn',
		todoItemDateClass: 'todo__item__date',
		todoItemDescClass: 'todo__item__desc',
		hideClass: 'hide',
		doneClass: 'done'
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
	const getEditInput = () => {
		const title = document.querySelector(DOMStrings.editTodoTitle).value;
		const date = document.querySelector(DOMStrings.editTodoDate).value;
		const prio = document.querySelector(DOMStrings.editTodoPrio).value;
		const desc = document.querySelector(DOMStrings.editTodoDesc).value;
		return { title, date, prio, desc };
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
		const editBtn = document.createElement('button');
		const editIcon = document.createElement('i');
		const date = document.createElement('div');
		const desc = document.createElement('div');
		// 2. Add attributes
		todoItemDiv.classList.add(DOMStrings.todoItemClass);
		todoItemDiv.setAttribute('id', `todo-${obj.id}`);
		todoItemDiv.classList.add(obj.done ? DOMStrings.doneClass : obj.priority);
		shortDiv.classList.add(DOMStrings.todoItemShortClass);
		checkbox.type = 'checkbox';
		checkbox.classList.add(DOMStrings.todoItemCheckbox);
		checkbox.checked = obj.done;
		titleDiv.classList.add(DOMStrings.todoItemTitleClass);
		titleDiv.innerText = obj.title;
		trashIcon.classList.add('fas', 'fa-trash-alt');
		deleteBtn.classList.add(DOMStrings.todoItemDeleteBtnClass);
		deleteBtn.append(trashIcon);
		shortDiv.append(checkbox, titleDiv, deleteBtn);
		extraDiv.classList.add(DOMStrings.todoItemExtraClass, DOMStrings.hideClass);
		editBtn.classList.add(DOMStrings.todoItemEditBtnClass);
		editIcon.classList.add('fas', 'fa-edit');
		date.classList.add(DOMStrings.todoItemDateClass);
		date.innerText = obj.date;
		desc.classList.add(DOMStrings.todoItemDescClass);
		desc.innerText = obj.description;
		editBtn.append(editIcon);
		extraDiv.append(editBtn, date, desc);
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
		const title = document.querySelector(DOMStrings.addTodoTitle);
		const date = document.querySelector(DOMStrings.addTodoDate);
		const prio = document.querySelector(DOMStrings.addTodoPrio);
		const desc = document.querySelector(DOMStrings.addTodoDesc);
		title.value = '';
		date.value = '';
		prio.value = '';
		desc.value = '';
		title.focus();
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
	const setEditInputs = (listID, todoID, obj) => {
		const editTodo = document.querySelector(DOMStrings.editTodo);
		const containerEditTitle = document.querySelector(DOMStrings.containerEditTitle);
		const title = document.querySelector(DOMStrings.editTodoTitle);
		const date = document.querySelector(DOMStrings.editTodoDate);
		const prio = document.querySelector(DOMStrings.editTodoPrio);
		const desc = document.querySelector(DOMStrings.editTodoDesc);
		editTodo.setAttribute('id', `list-${listID}--todo-${todoID}`);
		containerEditTitle.innerText = `Edit ${obj.title}`;
		title.value = obj.title;
		date.value = obj.date;
		prio.value = obj.priority;
		desc.value = obj.description;
	};
	const toggleHide = (el) => {
		el.classList.toggle(DOMStrings.hideClass);
	};

	return {
		getDOMStrings,
		getListInput,
		addListItem,
		deleteItem,
		clearListField,
		setupTodos,
		setEditInputs,
		getTodoInput,
		addTodoItem,
		clearTodoFields,
		getEditInput,
		toggleHide
	};
})();
export default uiController;

const listController = (() => {
	// CODE FOR THE DATA STRUCTURE
	class List {
		constructor(id, title) {
			this.id = id;
			this.title = title;
			this.todos = [];
		}
	}
})();

export default listController;

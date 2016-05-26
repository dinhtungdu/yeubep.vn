import alt from '../alt';

class CategoryActions {
	constructor() {
		this.generateActions(
			'getCategorySuccess',
			'likeSuccess',
			'followSuccess',
			'getCategoryRecipesSuccess'
		);
	}

	getCategory(id) {
		$.ajax('/api/categories/' + id)
		.done((resp) => {
			this.actions.getCategorySuccess(resp);
		});
	}
	getCategoryRecipes(id) {
		$.ajax('/api/categoryrecipes/' + id)
		.done((data) => {
			this.actions.getCategoryRecipesSuccess(data);
		});
	}

}

export default alt.createActions(CategoryActions);
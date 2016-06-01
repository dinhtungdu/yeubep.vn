import alt from '../alt';

class HomeActions {
	constructor() {
		this.generateActions(
			'getCategoriesSuccess',
			'getRecipesSuccess'
		);
	}

	getCategories() {
		$.ajax({ url: '/api/categories' })
			.done((data) => {
				this.actions.getCategoriesSuccess(data);
			});
	}

	getRecipes() {
		$.ajax({ url: '/api/recipes' })
		.done((data) => {
			this.actions.getRecipesSuccess(data);
		});
	}

}

export default alt.createActions(HomeActions);
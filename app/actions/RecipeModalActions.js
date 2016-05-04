import alt from '../alt';

class RecipeModalActions {
	constructor() {
		this.generateActions(
			'getCategoriesSuccess',
			'handleChanges',
			'handleCategoryChange',
			'changeMainPhoto',
			'getRecipeFromParent'
		);
	}

	getCategories() {
		$.ajax({ url: '/api/categories' })
			.done((data) => {
				this.actions.getCategoriesSuccess(data);
			});
	}
}

export default alt.createActions(RecipeModalActions);
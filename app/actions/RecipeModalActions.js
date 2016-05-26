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

	deleteImage(id) {
		$.ajax({
			url: '/file/' + id,
			method: 'DELETE'
		});
	}
}

export default alt.createActions(RecipeModalActions);
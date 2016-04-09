import alt from '../alt';

class ProfileRecipesActions {
	constructor() {
		this.generateActions(
			'getCategoriesSuccess',
			'handleChanges',
			'handleCategoryChange',
			'addRecipeSuccess',
			'addRecipeError'
		);
	}

	getCategories() {
		$.ajax({ url: '/api/categories' })
			.done((data) => {
				this.actions.getCategoriesSuccess(data);
			});
	}

	addRecipe(data) {
		$.ajax({
			type: 'POST',
			url: '/api/recipes',
			data: data
		})
		.done((data) => {
			this.actions.addRecipeSuccess(data);
		})
		.fail((jqXhr) => {
			this.actions.addRecipeFail(jqXhr.responseJSON.message);
		});
	}

}

export default alt.createActions(ProfileRecipesActions);
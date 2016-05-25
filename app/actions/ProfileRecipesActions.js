import alt from '../alt';

class ProfileRecipesActions {
	constructor() {
		this.generateActions(
			'handleChanges',
			'handleCategoryChange',
			'addRecipeSuccess',
			'addRecipeFail',
			'getRecipesSuccess',
			'getRecipesFail',
			'getAllRecipesSuccess',
			'getAllRecipesFail'
		);
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

	getRecipes(userId) {
		$.ajax({
				url: '/api/' + userId + '/recipes'
			})
			.done((data) => {
				this.actions.getRecipesSuccess(data);
			})
			.fail((jqXhr) => {
				this.actions.getRecipesFail(jqXhr.responseJSON.message);
			});
	}

	getAllRecipes(userId) {
		$.ajax({
			url: '/api/' + userId + '/allrecipes'
		})
		.done((data) => {
			this.actions.getRecipesSuccess(data);
		})
		.fail((jqXhr) => {
			this.actions.getRecipesFail(jqXhr.responseJSON.message);
		});
	}

}

export default alt.createActions(ProfileRecipesActions);
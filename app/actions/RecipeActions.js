import alt from '../alt';
import RecipeModalActions from './RecipeModalActions';

class RecipeActions {
	constructor() {
		this.generateActions(
			'getCategoriesSuccess',
			'getRecipeSuccess',
			'getRecipeFail',
			'updateRecipeSuccess',
			'updateRecipeFail',
			'likeSuccess'
		);
	}

	getRecipe(recipeId) {
		$.ajax({
				url: '/api/recipes/' + recipeId,
				statusCode: {
					404: function() {
						window.location.replace('/khong-tim-thay');
					}
				}
			})
			.done((data) => {
				this.actions.getRecipeSuccess(data);
				RecipeModalActions.getRecipeFromParent(data);
			});
	}

	updateRecipe(dataToSend) {
		$.ajax({
			url: '/api/recipes/' + dataToSend.id,
			type: 'PUT',
			data: dataToSend
		})
		.done((data) => {
			this.actions.updateRecipeSuccess(data);
		})
		.fail((jqXhr) => {
			this.actions.updateRecipeFail(jqXhr.responseJSON.message);
		});
	}

	handleLike(postId) {
		$.ajax({
			url: '/api/love/' + postId,
			type: 'PUT'
		})
		.done((data) => {
			this.actions.likeSuccess(data);
		});
	}

}

export default alt.createActions(RecipeActions);
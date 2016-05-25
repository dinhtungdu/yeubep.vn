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
			'likeSuccess',
			'addCommentSuccess',
			'getSameOwnerRecipesSuccess'
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
				this.actions.getSameOwnerRecipes({id: data.contentId, userId: data.userId._id.toString()})
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

	addRecipePhoto(data) {
		$.ajax({
			url: '/api/recipes/' + data.recipeId + '/photo/' + data.photoId,
			type: 'PUT'
		})
		.done((resp) => {
			toastr.success(resp);
			window.location.reload();
			//this.getRecipe(data.recipeId);
		});
	}

	addComment(data) {
		$.ajax({
			url: '/api/comments',
			type: 'POST',
			data: {
				commentBody: data.comment,
				postId: data.postId,
				rating: data.rating
			}
		})
		.done((resp) => {
			toastr.success(resp);
			$('#addReviewModal').modal('hide');
		});
	}

	likeReview(postId) {
		$.ajax({
				url: '/api/lovecomment/' + postId,
				type: 'PUT'
			});
	}

	getSameOwnerRecipes(data) {
		$.ajax({
			url: '/api/recipes/'+data.id+'/same/' + data.userId
		})
		.done((resp) => {
			this.actions.getSameOwnerRecipesSuccess(resp);
		});
	}

	deleteRecipe(data) {
		$.ajax({
			method: 'DELETE',
			url: '/api/recipes/' + data.recipeId
		})
		.done((resp) => {
			window.location.replace('/cook/' + data.username + '/recipes');
		});
	}

}

export default alt.createActions(RecipeActions);
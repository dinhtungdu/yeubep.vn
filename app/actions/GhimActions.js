import alt from '../alt';

class GhimActions {
	constructor() {
		this.generateActions(
			'getRecipeSuccess',
			'getCollectionsSuccess'
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
			});
	}

	getCollections(userId) {
		$.ajax({
			url: '/api/usercollections/' + userId
		})
		.done((data) => {
			this.actions.getCollectionsSuccess(data);
		});
	}

	addToCollection(dataToSend) {
		$.ajax({
			url: '/api/collections/add/'+dataToSend.collectionId,
			method: 'POST',
			data: {
				recipeId: dataToSend.recipeId
			}
		})
		.done((data) => {
			toastr.success(data);
		});
	}
}

export default alt.createActions(GhimActions);
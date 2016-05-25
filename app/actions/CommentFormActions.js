import alt from '../alt';

class RecipeModalActions {
	constructor() {
		this.generateActions(
			'addCommentSuccess'
		);
	}

	addCollectionComment(dataToSend) {
		$.ajax({
			url: '/api/collection-comments/',
			method: 'POST',
			data: {
				commentBody: dataToSend.commentBody,
				postId: dataToSend.postId
			}
		})
		.done((data) => {
			this.actions.addCommentSuccess(data);
		});
	}
}

export default alt.createActions(RecipeModalActions);
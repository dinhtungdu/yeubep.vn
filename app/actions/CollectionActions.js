import alt from '../alt';

class CollectionActions {
	constructor() {
		this.generateActions(
			'getCollectionSuccess',
			'likeSuccess',
			'followSuccess'
		);
	}

	getCollection(id) {
		$.ajax('/api/collections/' + id)
		.done((resp) => {
			this.actions.getCollectionSuccess(resp);
		});
	}

	handleLike(postId) {
		$.ajax({
				url: '/api/lovecollection/' + postId,
				type: 'PUT'
			})
			.done((data) => {
				this.actions.likeSuccess(data);
			});
	}

	handleFollow(postId) {
		$.ajax({
				url: '/api/followcollection/' + postId,
				type: 'PUT'
			})
			.done((data) => {
				this.actions.followSuccess(data);
			});
	}

}

export default alt.createActions(CollectionActions);
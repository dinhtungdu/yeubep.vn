import alt from '../alt';
import history from '../history';

class ProfileCollectionsActions {
	constructor() {
		this.generateActions(
			'getCollectionsSuccess',
			'getCollectionsError',
			'addCollectionSuccess'
		);
	}

	getCollections(userId) {
		$.ajax({
				url: '/api/usercollections/' + userId
			})
			.done((data) => {
				this.actions.getCollectionsSuccess(data);
			})
			.fail((jqXhr) => {
				this.actions.getCollectionsFail(jqXhr.responseJSON.message);
			});
	}

	addCollection(dataToSend) {
		$.ajax({
			url: '/api/collections',
			method: 'POST',
			data: {
				collectionTitle: dataToSend.title,
				collectionDesc: dataToSend.desc
			}
		})
		.done((data) => {
			window.location.replace('/collections/' + data);
		});
	}
}

export default alt.createActions(ProfileCollectionsActions);

import alt from '../alt';

class ProfileActions {
	constructor() {
		this.generateActions(
			'getCookSuccess',
			'getMyAvatarSuccess'
		);
	}

	getCook(userId) {
		$.ajax({url: '/auth/user/' + userId})
			.done((data) => {
				this.actions.getCookSuccess(data);
			});
	}

}

export default alt.createActions(ProfileActions);
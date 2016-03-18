import alt from '../alt';

class NavbarActions {
	constructor() {
		this.generateActions(
			'getMyInfoSuccess',
			'getMyAvatarSuccess'
		);
	}

	getMyInfo() {
		$.ajax({url: '/auth/me'})
			.done((data) => {
				this.actions.getMyInfoSuccess(data);
			});
	}

}

export default alt.createActions(NavbarActions);
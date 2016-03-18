import alt from '../alt';

class HomeActions {
	constructor() {
		this.generateActions(
			'getLoginStateSuccess',
			'getLoginStateFail'
		);
	}

	getLoginState() {
		$.ajax({url: '/auth/login-state'})
			.done((data) => {
				this.actions.getLoginStateSuccess(data);
			});
	}
}

export default alt.createActions(HomeActions);
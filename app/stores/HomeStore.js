import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
	constructor() {
		this.bindActions(HomeActions);
		this.loginState = 'hello ';
	}

	onGetLoginStateSuccess(data) {
		this.loginState = data
	}
}

export default alt.createStore(HomeStore);

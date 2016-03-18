import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
	constructor() {
		this.bindActions(NavbarActions);
		this.myInfo = [];
	}

	onGetMyInfoSuccess(data) {
		this.myInfo = data;
	}

}

export default alt.createStore(NavbarStore);
import alt from '../alt';
import ProfileActions from '../actions/ProfileActions';

class ProfileStore {
	constructor() {
		this.bindActions(ProfileActions);
		this.cook = [];
	}

	onGetCookSuccess(data) {
		this.cook = data;
	}

}

export default alt.createStore(ProfileStore);
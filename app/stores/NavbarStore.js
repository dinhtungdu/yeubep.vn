import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
	constructor() {
		this.bindActions(NavbarActions);
		this.myInfo = [];
		this.current_user_avatar = '/images/df-avatar-sm.png';
		this.currentUserId = "";
	}

	onGetMyInfoSuccess(data) {
		this.myInfo = data;
		this.currentUserId = this.myInfo._id;
		this.current_user_avatar = 'http://graph.facebook.com/v2.5/' + this.myInfo.facebook.id + '/picture?height=70&width=70';
	}

}

export default alt.createStore(NavbarStore);
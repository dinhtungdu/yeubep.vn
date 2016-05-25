'use strict';
import alt from '../alt';
import ProfileCollectionsActions from '../actions/ProfileCollectionsActions';
import _ from 'underscore';

class ProfileCollectionsStore {
	constructor() {
		this.bindActions(ProfileCollectionsActions);
		this.collections = null;
	}

	onGetCollectionsSuccess(data) {
		this.collections = data;
	}

}

export default alt.createStore(ProfileCollectionsStore);

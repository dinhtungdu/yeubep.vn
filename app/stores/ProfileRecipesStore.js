'use strict';
import alt from '../alt';
import ProfileRecipesActions from '../actions/ProfileRecipesActions';
import _ from 'underscore';

class ProfileRecipesStore {
	constructor() {
		this.bindActions(ProfileRecipesActions);
		this.recipes = [];
	}

	onHandleChanges(event) {
		this.formData[event.target.name] = $('<p>' + event.target.value + '</p>').text();
	}

	onAddRecipeSuccess(data) {
		window.location.replace('/recipe/' + data.contentId);
	}

	onGetRecipesSuccess(data) {
		this.recipes = data;
	}

	onGetAllRecipesSuccess(data) {
		this.recipes = data;
	}

}

export default alt.createStore(ProfileRecipesStore);
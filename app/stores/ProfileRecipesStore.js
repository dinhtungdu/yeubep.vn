'use strict';
import alt from '../alt';
import ProfileRecipesActions from '../actions/ProfileRecipesActions';
import _ from 'underscore';

class ProfileRecipesStore {
	constructor() {
		this.bindActions(ProfileRecipesActions);
		this.categories = [];
		this.formData = {
			visible: 'public',
			title: '',
			description: '',
			ingredients: '',
			directions: '',
			note: ''
		};
	}

	onGetCategoriesSuccess(data) {
		var tempArr = [];
		_.each(data, function(value, index) {
			tempArr.push({value: index, label: value});
		});
		this.categories = tempArr;
	}

	onHandleChanges(event) {
		this.formData[event.target.name] = $('<p>' + event.target.value + '</p>').text();
		console.log(this.formData);
	}

	onHandleCategoryChange(val) {
		this.formData.category = val[0];
		console.log(this.formData);
	}

	onAddRecipeSuccess(data) {
		window.location.replace('/recipe/' + data.id);
	}

}

export default alt.createStore(ProfileRecipesStore);
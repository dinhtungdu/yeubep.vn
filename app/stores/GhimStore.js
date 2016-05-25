'use strict';
import alt from '../alt';
import GhimActions from '../actions/GhimActions';

class GhimStore {
	constructor() {
		this.bindActions(GhimActions);
		this.recipe = {
			title: '',
			description: '',
			photo: '/images/df-img.jpg',
			_id: ''
		}
		this.collections = [];
	}

	onGetRecipeSuccess(data) {
		this.recipe.title = data.recipe.title;
		this.recipe.photo = '/file/' + data.mainPhoto._id;
		this.recipe._id = data._id;
		this.recipe.description = data.recipe.description;
	}

	onGetCollectionsSuccess(data) {
		this.collections = data;
	}

}

export default alt.createStore(GhimStore);
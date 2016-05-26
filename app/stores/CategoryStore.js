'use strict';
import alt from '../alt';
import CategoryActions from '../actions/CategoryActions';

class CategoryStore {
	constructor() {
		this.bindActions(CategoryActions);
		this.category = {
			name: ''
		}
		this.recipes = [];
	}

	onGetCategorySuccess(data) {
		this.category = data;
	}
	onGetCategoryRecipesSuccess(data) {
		this.recipes = data;
	}

}

export default alt.createStore(CategoryStore);
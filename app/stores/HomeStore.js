import alt from '../alt';
import HomeActions from '../actions/HomeActions';
import _ from 'underscore';

class HomeStore {
	constructor() {
		this.bindActions(HomeActions);
		this.categories = [];
		this.recipes = [];
	}

	onGetCategoriesSuccess(data) {
		var tempArr = [];
		_.each(data, function(value, index) {
			tempArr.push({value: index, label: value});
		});
		this.categories = tempArr;
	}

	onGetRecipesSuccess(data) {
		this.recipes = data;
	}

}

export default alt.createStore(HomeStore);

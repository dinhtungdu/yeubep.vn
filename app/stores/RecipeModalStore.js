'use strict';
import alt from '../alt';
import RecipeModalActions from '../actions/RecipeModalActions';
import _ from 'underscore';

class RecipeModalStore {
	constructor() {
		this.bindActions(RecipeModalActions);
		this.categories = [];
		this.formData = {
			visible: 'public',
			title: '',
			description: '',
			ingredients: '',
			directions: '',
			note: '',
			prepTime: '',
			cookTime: '',
			numberOfServings: '',
			mainPhoto: '',
			category: '56fc95543397ccb6ce6614af'
		};
		this.mockfile = [];
		this.notGetRecipeYet = true;
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
	}

	onHandleCategoryChange(val) {
		this.formData.category = val[0];
	}

	onChangeMainPhoto(id) {
		this.formData.mainPhoto = id;
	}

	onGetRecipeFromParent(data) {
		this.formData = {
			visible: data.visible,
			title: data.recipe.title,
			description: data.recipe.description,
			ingredients: data.recipe.ingredients,
			directions: data.recipe.directions,
			note: data.recipe.note,
			prepTime: data.recipe.prepTime,
			cookTime: data.recipe.cookTime,
			numberOfServings: data.recipe.numberOfServings,
			category: data.recipe.category
		};
		if( data.mainPhoto != null && typeof( data.mainPhoto ) == 'object') {
			this.formData.mainPhoto = data.mainPhoto._id;
			this.mockfile = data.mainPhoto;
		} else {
			this.mockfile = '';
		}
		this.notGetRecipeYet = false;
	}
}

export default alt.createStore(RecipeModalStore);
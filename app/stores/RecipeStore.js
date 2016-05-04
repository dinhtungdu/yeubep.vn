'use strict';
import alt from '../alt';
import RecipeActions from '../actions/RecipeActions';
import NavbarStore from './NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import _ from 'underscore';

class RecipeStore {
	constructor() {
		this.bindActions(RecipeActions);
		this.bindListeners({
			updateLikeState: NavbarActions.getMyInfoSuccess
		});
		this.recipe = {
			mainPhoto: '',
			recipe: {
				title: '',
				description: ''
			},
			loves: []
		};
		this.categories = [];
		this.likeState = 'dislike';
		this.likeCount = 0;
	}

	onGetRecipeSuccess(data) {
		this.recipe = data;
		this.likeCount = data.loves.length;
		if( _.indexOf( data.loves, NavbarStore.getState().currentUserId) >= 0) {
			this.likeState = 'like';
		}
	}

	updateLikeState(data) {
		if( _.indexOf( this.recipe.loves, data._id) >= 0) {
			this.likeState = 'like';
		}
	}


	onUpdateRecipeSuccess(data) {
		window.location.replace('/recipe/' + data.id);
	}

	onLikeSuccess(data) {
		this.likeState = data;
		if( data == 'like' ) {
			this.likeCount++;
		} else {
			this.likeCount--;
		}
	}

}

export default alt.createStore(RecipeStore);
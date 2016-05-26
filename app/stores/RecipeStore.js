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
				description: '',
				collections: [],
				category: null
			},
			createdAt: null,
			loves: []
		};
		this.categories = [];
		this.likeState = 'dislike';
		this.likeCount = 0;
		this.photoCount = 0;
		this.madeCount = 0;
		this.commentCount = 0;
		this.sameOwnerRecipes = null;
	}

	onGetRecipeSuccess(data) {
		this.recipe = data;
		this.likeCount = data.loves.length;
		this.commentCount = data.comments.length;
		this.photoCount = data.recipe.photos.length;
		if( _.indexOf( data.loves, NavbarStore.getState().currentUserId) >= 0) {
			this.likeState = 'like';
		}
		let _photosObjectCompact = [];
		data.recipe.photos.map((photo, index) => {
			if(photo.peopleId == null) {
				return;
			}
			_photosObjectCompact.push(photo.peopleId._id);
		});
		_photosObjectCompact = _.uniq(_photosObjectCompact);
		this.madeCount = _photosObjectCompact.length;
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

	onGetSameOwnerRecipesSuccess(data) {
		this.sameOwnerRecipes = data;
	}

}

export default alt.createStore(RecipeStore);
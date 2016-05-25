'use strict';
import alt from '../alt';
import CollectionActions from '../actions/CollectionActions';
import NavbarStore from './NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import CommentFormActions from '../actions/CommentFormActions';
import _ from 'underscore';

class CollectionStore {
	constructor() {
		this.bindActions(CollectionActions);
		this.bindListeners({
			updateLikeState: NavbarActions.getMyInfoSuccess,
			appendComment: CommentFormActions.addCommentSuccess
		});
		this.likeState = 'dislike';
		this.likeCount = 0;
		this.followCount = 0;
		this.followState = 'not-followed-yet';
		this.commentCount = 0;
		this.collection = {
			title: '',
			description: '',
			recipes: [],
			loves: [],
			comments: [],
			followers: [],
			userId: {
				name: '',
				username: '',
				facebook: {
					id: ''
				}
			}
		}
	}

	onGetCollectionSuccess(data) {
		this.collection = data;
		this.likeCount = data.loves.length;
		this.followCount = data.followers.length;
		this.commentCount = data.comments.length;
		if( _.indexOf( data.loves, NavbarStore.getState().currentUserId) >= 0) {
			this.likeState = 'like';
		}
		if( _.indexOf( data.followers, NavbarStore.getState().currentUserId) >= 0) {
			this.followState = 'followed';
		}
	}

	onLikeSuccess(data) {
		this.likeState = data;
		if( data == 'like' ) {
			this.likeCount++;
		} else {
			this.likeCount--;
		}
	}

	onFollowSuccess(data) {
		this.followState = data;
		if( data == 'followed' ) {
			this.followCount++;
		} else {
			this.followCount--;
		}
	}

	updateLikeState(data) {
		if( _.indexOf( this.collection.loves, data._id) >= 0) {
			this.likeState = 'like';
		}
		if( _.indexOf( this.collection.followers, data._id) >= 0) {
			this.followState = 'followed';
		}
	}

	appendComment(data) {
		data.userId = NavbarStore.getState().myInfo;
		this.collection.comments.unshift(data);
		this.commentCount++;
		$('#commentBody').val('');
	}

}

export default alt.createStore(CollectionStore);
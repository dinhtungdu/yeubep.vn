import React from 'react';
import {Link} from 'react-router';
import CollectionActions from '../actions/CollectionActions';
import CollectionStore from '../stores/CollectionStore';
import NavbarStore from '../stores/NavbarStore';
import AvatarUsername from './inc/AvatarUsername';
import LikeButton from './inc/LikeButton';
import CommentForm from './CommentForm';
import Comment from './inc/Comment';
import RecipeSmall from './inc/RecipeSmall';

class Collection extends React.Component {
	constructor(props) {
		super(props);
		this.state = Object.assign( CollectionStore.getState(), NavbarStore.getState() );
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		CollectionStore.listen(this.onChange);
		NavbarStore.listen(this.onChange);
		CollectionActions.getCollection(this.props.params.collectionId);
		this.masonry = $('.grid').masonry({
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			itemSelector: '.grid-item',
			fitWidth: true
		});
	}

	componentWillUnmount() {
		CollectionStore.unlisten(this.onChange);
		NavbarStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state, function() {
			this.masonry.masonry('reloadItems');
			this.masonry.masonry();
		});
	}

	facebookLogin() {
		var url = '/auth/facebook',
			width = 400,
			height = 500,
			top = (window.outerHeight - height) / 2,
			left = (window.outerWidth - width) / 2;
		window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
	}

	handleLike(event) {
		let self = this;
		event.preventDefault();
		if( this.state.currentUserId == '' ) {
			toastr.info('Bạn cần đăng nhập!', '', {
				onclick: function () {
					self.facebookLogin();
				}
			});
			return;
		}
		CollectionActions.handleLike(this.state.collection._id);
	}

	handleFollow() {
		let self = this;
		if( this.state.currentUserId == '' ) {
			toastr.info('Bạn cần đăng nhập!', '', {
				onclick: function () {
					self.facebookLogin();
				}
			});
			return;
		}
		CollectionActions.handleFollow(this.state.collection._id);
	}
	
	render() {
		let recipesList = null;
		recipesList = this.state.collection.recipes.map((recipe) => {
			if( recipe.recipeId != null) {
				return(
					<RecipeSmall
						key={recipe._id}
						recipeUrl={'/recipe/' + recipe.recipeId.contentId}
						imgId={recipe.recipeId.mainPhoto}
						imgWidth="213"
						imgHeight="171"
						recipeTitle={recipe.recipeId.recipe.title}
						class="recipe-grid-item grid-item"
						location={this.props.location}
					/>
				);
			}
		});
		return (
			<div id="Collection">
				<header className="collection-header">
					<div className="container">
						<AvatarUsername owner={this.state.collection.userId} />
						<h1>{this.state.collection.title}</h1>
						<p>{this.state.collection.description}</p>
						<div className="collection-counter text-xs-center">
							<span className="item like">
								<LikeButton
									currentUser={this.state.currentUserId}
									handleLike={this.handleLike.bind(this)}
									likeState={this.state.likeState}
									likes={this.state.collection.loves}
								/>
									<span className="count">{this.state.likeCount}</span>
							</span>
							<span className="item follow">
								<a href="javascript:void(0)" onClick={this.handleFollow.bind(this)} className={this.state.followState}>
									<i className="fa fa-check"></i>
									<span className="txt">Theo dõi</span>
								</a>
									<span className="count">{this.state.followCount}</span>
							</span>
							<span className="item comment">
								<a href="#collection-comments">
									<i className="fa fa-comment-o"></i>
									<span className="txt">Bình luận</span>
								</a>
									<span className="count">{this.state.commentCount}</span>
							</span>
						</div>
					</div>
				</header>
				<div className="container">
					<div className="row">
						<div className="col-sm-8">
							<div className="grid">
								<div className="grid-sizer"></div>
								<div className="gutter-sizer"></div>
								{recipesList}
								</div>
						</div>
						<div className="col-sm-4" id="collection-comments">
							<div className="inside">
								<h2>Nhận xét</h2>
								<CommentForm
									contentId={this.state.collection._id}
									type="collection"
								/>
								{ this.state.collection.comments.map(comment =>
									<Comment
										comment={comment}
										key={comment._id}
									/>)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Collection;
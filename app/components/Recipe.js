import React from 'react';
import {Link} from 'react-router';
import RecipeStore from '../stores/RecipeStore';
import RecipeActions from '../actions/RecipeActions';
import RecipeHeaderCover from './inc/RecipeHeaderCover';
import RecipeModal from './RecipeModal';
import AddReviewModal from './inc/AddReviewModal';
import RecipeModalStore from '../stores/RecipeModalStore';
import NavbarStore from '../stores/NavbarStore';
import _ from 'underscore';
import Review from './inc/Review';
import RecipeSmall from './inc/RecipeSmall';
import AddedToCollection from './inc/AddedToCollection';
import LikeButton from './inc/LikeButton';
import Helpers from '../helpers';
import AddRecipePhotoModal from './inc/AddRecipePhotoModal';
import moment from 'moment';
import async from 'async';

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = Object.assign( RecipeStore.getState(), RecipeModalStore.getState(), NavbarStore.getState() );
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		let self = this;
		RecipeStore.listen(this.onChange);
		RecipeModalStore.listen(this.onChange);
		NavbarStore.listen(this.onChange);
		RecipeActions.getRecipe(this.props.params.recipeId);
		this.masonry = $('.side-grid').masonry({
			columnWidth: '.side-grid-sizer',
			gutter: '.side-gutter-sizer',
			itemSelector: '.side-grid-item'
		});
	}

	onChange(state) {
		this.setState(state);
		this.masonry.masonry('reloadItems');
		this.masonry.masonry();
	}

	handleLike(event) {
		let self = this;
		event.preventDefault();
		if( this.state.currentUserId == '' ) {
			toastr.info('Bạn cần đăng nhập!', '', {
				onclick: function () {
					Helpers.facebookLogin();
				}
			});
			return;
		}
		RecipeActions.handleLike(this.state.recipe._id);
	}

	addPhotoModal(event) {
		let self = this;
		event.preventDefault();
		if( self.state.currentUserId == '' ) {
			toastr.info('Bạn cần đăng nhập để thêm ảnh', '', {
				onclick: function() {
					Helpers.facebookLogin();
				}
			});
			return;
		}
		$('#addRecipePhotoModal').modal();
	}

	addPhotoHandler(event) {
		event.preventDefault();
		let photoId = $('#imadeitPhotoId').val();
		let postToFacebook = false;
		if( $('#post-to-facebook').is(':checked') ) {
			postToFacebook = true;
		}
		let dataToSend = {
			photoId: photoId,
			postFace: postToFacebook,
			recipeId: this.state.recipe._id
		};
		//console.log(dataToSend);
		RecipeActions.addRecipePhoto(dataToSend);
	}

	addReviewHandler(event) {
		event.preventDefault();
		let dataToSend = {
			postId: this.state.recipe._id,
			comment: $('#recipeReview').val(),
			rating: $('#review-star-rating').val()
		}
		RecipeActions.addComment(dataToSend);
	}

	reviewModal(event) {
		let self = this;
		event.preventDefault();
		if( self.state.currentUserId == '' ) {
			toastr.info('Bạn cần đăng nhập để thêm đánh giá', '', {
				onclick: function() {
					Helpers.facebookLogin();
				}
			});
			return;
		}
		$('#addReviewModal').modal();
	}

	UpdateRecipeHandler(event) {
		event.preventDefault();
		var dataToSend = this.state.formData;
		dataToSend = Object.assign(
			{ id: this.state.recipe._id }, dataToSend
		);
		RecipeActions.updateRecipe(dataToSend) ;
	}

	openPhotoSwipe(pos) {
		var pswpElement = document.querySelectorAll('.pswp')[0];

		var items = [];
		this.state.recipe.recipe.photos.map((thumb, index) => {
			if(thumb.peopleId == null) return;
			items.push({
				src: '/file/' + thumb.photoId._id,
				w: thumb.photoId.metadata.width,
				h: thumb.photoId.metadata.height,
				title: thumb.peopleId.name,
				avatar: Helpers.fb_avatar(thumb.peopleId.facebook.id, 100, 100),
				profile: '/cook/' + thumb.peopleId.username,
				time: moment(thumb.photoId.uploadDate).format('D/M/YYYY')
			});
		});

		var options = {
			index: pos,
			addCaptionHTMLFn: function(item, captionEl, isFake) {
				if(!item.title) {
					captionEl.children[0].innerText = '';
					return false;
				}
				captionEl.children[0].innerHTML = '<a href="' + item.profile + '"><img src="' + item.avatar + '"><span class="info"><span class="username">' + item.title + '</span><time class="date">'+ item.time +'</time></span></a>';
				return true;
			}
		};

		var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
		gallery.init();
	}

	likeReview(id, event) {
		console.log(event);
		$(event.currentTarget).toggleClass('liked');
		RecipeActions.likeReview(id);
	}

	handleDelete(event) {
		var r = confirm('Bạn có chắc chắn muốn xóa công thức này không?');
		if( r == true ) {
			RecipeActions.deleteRecipe({
				recipeId: this.state.recipe._id,
				username: this.state.myInfo.username
			});
		}
	}

	render() {
		let imgUrl = '/images/meal-icon.png';
		if( this.state.recipe.mainPhoto != "" && this.state.recipe.mainPhoto != null ) {
			imgUrl = '/file/' + this.state.recipe.mainPhoto.metadata.thumbs.s320.id;
		}

		let isOwner = false;
		if ( !this.state.notGetRecipeYet && this.state.currentUserId == this.state.recipe.userId._id ) {
			isOwner = true;
		}

		let ingredientsList = null;
		if( typeof this.state.recipe.recipe.ingredients != 'undefined') {
			let ingredients = this.state.recipe.recipe.ingredients.split("\n");
			ingredientsList = ingredients.map((ingredient, index) => {
				return (
					<li key={index}>
						{ingredient}
					</li>
				);
			});
		}

		let directionsList = null;
		if( typeof this.state.recipe.recipe.directions != 'undefined') {
			let directions = this.state.recipe.recipe.directions.split("\n");
			directionsList = directions.map((direction, index) => {
				return (
					<li key={index}>
						<span className="counter"></span>
						{direction}
					</li>
				);
			});
		}

		let reviewList = null;
		if( typeof this.state.recipe.comments != 'undefined') {
			reviewList = this.state.recipe.comments.map((review, index) => {
				return (
					<Review
						key={review._id}
						rating={review.rating}
						body={review.body}
						time={review.createdAt}
						user={review.userId}
						likes={review.loves}
						likeCount={review.loves.length}
						handleLike={this.likeReview.bind(this, review._id)}
					/>
				);
			});
		}

		let thumbList = null;
		if( typeof this.state.recipe.recipe.photos != 'undefined' && !_.isEmpty(this.state.recipe.recipe.photos) ) {
			thumbList = this.state.recipe.recipe.photos.map((thumb, index) => {
				if(thumb.peopleId == null) return;
				if( index >= 9 ) return;
				return(
					<a key={thumb.photoId._id} href="javascript:void(0)" onClick={this.openPhotoSwipe.bind(this, index)}><img src={'/file/' + thumb.photoId.metadata.thumbs.s320.id} /></a>
				);
			});
		}

		let sameOwnerList = null;
		let _props = this.props;
		if( this.state.sameOwnerRecipes != null ) {
			sameOwnerList = this.state.sameOwnerRecipes.map((recipe, index) => {
				return(
					<RecipeSmall
						key={recipe.contentId}
						recipeUrl={'/recipe/' + recipe.contentId}
						imgId={recipe.mainPhoto}
						imgWidth="150"
						imgHeight="121"
						recipeTitle={recipe.recipe.title}
						location={_props.location}
						class="recipe-small-item recipe-grid-item side-grid-item"
					/>
				);
			});
		}

		return (
			<div className="Recipe recipe-detail">
				{ ( !this.state.notGetRecipeYet && this.state.currentUserId == this.state.recipe.userId._id ) ?
					<RecipeModal
						handleSubmit={this.UpdateRecipeHandler.bind(this)}
						edit="1"
					/>
					: null
				}
				<RecipeHeaderCover
					recipePhoto={imgUrl}
					recipeTitle={this.state.recipe.recipe.title}
					isOwner={isOwner}
					recipeDesc={this.state.recipe.recipe.description}
					recipeOwner={this.state.recipe.userId}
					recipeTime={this.state.recipe.createdAt}
					likeCount={this.state.likeCount}
					photoCount={this.state.photoCount}
					madeCount={this.state.madeCount}
					commentCount={this.state.commentCount}
					onClickPhoto={this.openPhotoSwipe.bind(this, 0)}
					handleDelete={this.handleDelete.bind(this)}
				/>
				<div className="main container">
					<div className="row">
					<div className="col-md-8">
						<div className="primary container-fluid">
							<div className="actions row">
								<div className="like col-sm-3">
									<LikeButton
										currentUser={this.state.currentUserId}
										handleLike={this.handleLike.bind(this)}
										likeState={this.state.likeState}
										likes={this.state.recipe.loves}
									/>
								</div>
								<div className="ghim col-sm-3">
									<Link state={{ modal: true, returnTo: this.props.location.pathname }} to={'/recipe/' + this.state.recipe.contentId + '/ghim'}>
										<i className="fa fa-thumb-tack"></i>
										<span className="txt hidden-sm-down">Ghim</span>
									</Link>
								</div>
								<div className="imi col-sm-3">
									<a href="javascript:void(0)">
										<i className="fa imadeit"></i>
										<span className="txt hidden-sm-down">Tôi đã làm món này</span>
									</a>
								</div>
								<div className="review col-sm-3">
									<a href="#review-section">
										<i className="fa fa-commenting"></i>
										<span className="txt hidden-sm-down">Đánh giá</span>
									</a>
								</div>
								<div className="share col-sm-3">
									<a href="javascript:void(0)">
										<i className="fa fa-share-alt"></i>
										<span className="txt hidden-sm-down">Chia sẻ</span>
									</a>
								</div>
							</div>
							<section className="ingredients clearfix">
								<header className="clearfix">
									<h2><i className="fa fa-wpforms"></i> Nguyên liệu</h2>
									<div className="timing">
										{(this.state.recipe.recipe.prepTime != null || this.state.recipe.recipe.cookTime != null) ?
											<span>
												{this.state.recipe.recipe.prepTime + this.state.recipe.recipe.cookTime} phút <i className="fa fa-clock-o"></i>
											</span> : null }
										{this.state.recipe.recipe.numberOfServings != null ?
										<span>
											{this.state.recipe.recipe.numberOfServings} người <i className="fa fa-pie-chart"></i>
										</span> : null}
									</div>
								</header>
								<ul className="clearfix">
									{ingredientsList}
								</ul>
							</section>
							<section className="directions clearfix">
								<header className="clearfix">
									<h2><i className="fa fa-flag-checkered"></i> Cách nấu</h2>
									<div className="timing">
										{(this.state.recipe.recipe.prepTime != null) ?
											<span>
												Chuẩn bị {this.state.recipe.recipe.prepTime} phút <i className="fa fa-clock-o"></i>
											</span> : null }
										{(this.state.recipe.recipe.cookTime != null) ?
											<span>
												Nấu {this.state.recipe.recipe.cookTime} phút <i className="fa fa-clock-o"></i>
											</span> : null }
									</div>
								</header>
								<ul className="clearfix">
									{directionsList}
								</ul>
								{ typeof this.state.recipe.recipe.note != 'undefined' && this.state.recipe.recipe.note != null ?
								<div className="notes">
									<h3><i className="fa fa-sticky-note-o"></i> Mách nhỏ</h3>
									<p>{this.state.recipe.recipe.note}</p>
								</div>
								: null }
							</section>
							<section className="i-made-it">
								<button onClick={this.addPhotoModal.bind(this)} className="btn button-primary button-orange"><span>Tôi đã làm món này</span></button>
								<AddRecipePhotoModal
									recipeTitle={this.state.recipe.recipe.title}
									handleSubmit={this.addPhotoHandler.bind(this)}
								/>
							</section>
							<section id="review-section" className="review-rating clearfix">
								<header className="clearfix">
									<h2><i className="fa fa-comment"></i> Đánh giá và nhận xét</h2>
								</header>
								<div className="overview">
									<div className="leave-review">
										<img src={this.state.current_user_avatar} width="50" height="50" />
										<button className="btn button-small button-orange-lighter" onClick={this.reviewModal.bind(this)}><i className="fa fa-pencil"></i> Thêm đánh giá</button>
										<AddReviewModal
											recipeTitle={this.state.recipe.recipe.title}
											handleSubmit={this.addReviewHandler.bind(this)}
										/>
									</div>
								</div>
								<div className="reviewList">
									{reviewList}
								</div>
							</section>
						</div>
					</div>
					<div className="col-md-4">
						<div className="secondary">
							<aside className="wg-photo">
								<h3 className="widget-title">
									Ảnh
								</h3>
								{thumbList == null ? '' :
									<div className="photo-grid">
										{thumbList}
									</div>
								}
								<a href="javascript:void(0)" className="read-all photo-all" onClick={this.openPhotoSwipe.bind(this, 0)}>Xem toàn bộ..</a>
							</aside>
							<aside className="wg-collection">
								<h3 className="widget-title">
									Bộ sưu tập
								</h3>
								<div className="list">
									{this.state.recipe.recipe.collections.map(collection =>
										<AddedToCollection
										user={collection.collectionId.userId}
										collectionUrl={'/collections/' + collection.collectionId.collectionId}
										collectionTitle={collection.collectionId.title}
										key={collection._id}
										/>
									)}
								</div>
							</aside>
							<aside className="wg-same-owner">
								<h3 className="widget-title">
									Cùng đầu bếp
								</h3>
								<div className="side-grid">
									<div className="side-grid-sizer"></div>
									<div className="side-gutter-sizer"></div>
									{sameOwnerList}
								</div>
								<a href="#" className="read-all photo-all">Xem toàn bộ..</a>
							</aside>
						</div>
					</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Recipe;
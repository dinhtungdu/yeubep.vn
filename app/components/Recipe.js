import React from 'react';
import {Link} from 'react-router';
import RecipeStore from '../stores/RecipeStore';
import RecipeActions from '../actions/RecipeActions';
import RecipeHeaderCover from './inc/RecipeHeaderCover';
import RecipeModal from './RecipeModal';
import AddReviewModal from './AddReviewModal';
import RecipeModalStore from '../stores/RecipeModalStore';
import NavbarStore from '../stores/NavbarStore';
import _ from 'underscore';
import Review from './inc/Review';
import RecipeSmall from './inc/RecipeSmall';
import AddedToCollection from './inc/AddedToCollection';
import LikeButton from './inc/LikeButton';
import Helpers from '../helpers';

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = Object.assign( RecipeStore.getState(), RecipeModalStore.getState(), NavbarStore.getState() );
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		RecipeStore.listen(this.onChange);
		RecipeModalStore.listen(this.onChange);
		NavbarStore.listen(this.onChange);
		RecipeActions.getRecipe(this.props.params.recipeId);
		this.masonry = $('.side-grid').masonry({
			columnWidth: '.side-grid-sizer',
			gutter: '.side-gutter-sizer',
			itemSelector: '.side-grid-item',
			fitWidth: true
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

	onChange(state) {
		this.setState(state);
		console.log(this.state);
		this.masonry.masonry('reloadItems');
		this.masonry.masonry();
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
		RecipeActions.handleLike(this.state.recipe._id);
	}

	reviewModal(event) {
		let self = this;
		event.preventDefault();
		if( this.state.currentUserId == '' ) {
			toastr.info('Bạn cần đăng nhập để thêm đánh giá', '', {
				onclick: function() {
					self.facebookLogin();
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

	render() {
		let imgUrl = '/images/meal-icon.png';
		if( this.state.recipe.mainPhoto != "" && this.state.recipe.mainPhoto != null ) {
			imgUrl = '/file/' + this.state.recipe.mainPhoto.metadata.thumbs.s320.id;
		}

		let isOwner = false;
		if ( !_.isEmpty(this.state.myInfo) && !this.state.notGetRecipeYet && this.state.myInfo._id == this.state.recipe.userId._id ) {
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
					<Review key={review._id} />
				);
			});
		}

		return (
			<div className="Recipe recipe-detail">
				{ ( !_.isEmpty(this.state.myInfo) && !this.state.notGetRecipeYet && this.state.myInfo._id == this.state.recipe.userId._id ) ?
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
								<div className="imi col-sm-3">
									<a href="#">
										<i className="fa imadeit"></i>
										<span className="txt">Tôi đã làm món này</span>
									</a>
								</div>
								<div className="review col-sm-3">
									<a href="#review-section">
										<i className="fa fa-commenting"></i>
										<span className="txt">Đánh giá</span>
									</a>
								</div>
								<div className="share col-sm-3">
									<a href="#">
										<i className="fa fa-share-alt"></i>
										<span className="txt">Chia sẻ</span>
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
								<button className="btn button-primary button-orange"><span>Tôi đã làm món này</span></button>
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
								<div className="photo-grid">
									<a href="#"><img src="/file/5719ab33ba638a93cab48a98" /></a>
									<a href="#"><img src="/file/5719ab33ba638a93cab48a98" /></a>
									<a href="#"><img src="/file/5719ab33ba638a93cab48a98" /></a>
									<a href="#"><img src="/file/5719ab33ba638a93cab48a98" /></a>
									<a href="#"><img src="/file/5719ab33ba638a93cab48a98" /></a>
									<a href="#"><img src="/file/5719ab33ba638a93cab48a98" /></a>
									<a href="#"><img src="/file/5719ab33ba638a93cab48a98" /></a>
									<a href="#"><img src="/file/5719ab33ba638a93cab48a98" /></a>
									<a href="#"><img src="/file/5719ab33ba638a93cab48a98" /></a>
								</div>
								<a href="#" className="read-all photo-all">Xem toàn bộ..</a>
							</aside>
							<aside className="wg-collection">
								<h3 className="widget-title">
									Bộ sưu tập
								</h3>
								<div className="list">
									<AddedToCollection
										user={{
										username: "dinhtungdu",
										name: "Du Dinh Tung",
										facebook: {
											id: 558377407664895
										}
										}}
										collectionUrl="#"
										collectionTitle="Bánh"
										key="2"
									/>
									<AddedToCollection
										user={{
										username: "dinhtungdu",
										name: "Du Dinh Tung",
										facebook: {
											id: 558377407664895
										}
										}}
										collectionUrl="#"
										collectionTitle="Bánh"
										key="1"
									/>
								</div>
							</aside>
							<aside className="wg-related">
								<h3 className="widget-title">
									Cùng đầu bếp
								</h3>
								<div className="side-grid">
									<div className="side-grid-sizer"></div>
									<div className="side-gutter-sizer"></div>
									<RecipeSmall
										key="1"
										recipeUrl="/recipe/ByxwDRTdg"
										imgUrl="/file/5719ab33ba638a93cab48a97"
										imgWidth="150"
										imgHeight="121"
										recipeTitle="Bánh mỳ nướng"
									/>
									<RecipeSmall
										key="2"
										recipeUrl="/recipe/ByxwDRTdg"
										imgUrl="/file/5719ab33ba638a93cab48a97"
										imgWidth="150"
										imgHeight="121"
										recipeTitle="Bánh mỳ nướng"
									/>
									<RecipeSmall
										key="3"
										recipeUrl="/recipe/ByxwDRTdg"
										imgUrl="/file/5719ab33ba638a93cab48a97"
										imgWidth="150"
										imgHeight="121"
										recipeTitle="Bánh mỳ nướng"
									/>
									<RecipeSmall
										key="4"
										recipeUrl="/recipe/ByxwDRTdg"
										imgUrl="/file/5719ab33ba638a93cab48a97"
										imgWidth="150"
										imgHeight="121"
										recipeTitle="Bánh mỳ nướng"
									/>
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
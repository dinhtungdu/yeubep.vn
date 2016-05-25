import React from 'react';
import {Link} from 'react-router';
import ProfileRecipesStore from '../stores/ProfileRecipesStore';
import ProfileRecipesActions from '../actions/ProfileRecipesActions';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import Select from 'react-select';
import Helmet from 'react-helmet';
import _ from 'underscore';
import RecipeModal from './RecipeModal';
import RecipeModalStore from '../stores/RecipeModalStore';

class ProfileRecipes extends React.Component {
	constructor(props) {
		super(props);
		this.state = Object.assign(ProfileRecipesStore.getState(), NavbarStore.getState(), RecipeModalStore.getState() );
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		this.masonry = $('.grid').masonry({
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			itemSelector: '.grid-item',
			fitWidth: true
		});
		ProfileRecipesStore.listen(this.onChange);
		NavbarStore.listen(this.onChange);
		RecipeModalStore.listen(this.onChange);
		ProfileRecipesActions.getRecipes(this.props.cookId);
		window.addEventListener('message', function(event){
			if(event.data == 'loggedIn') {
				NavbarActions.getMyInfo();
				ProfileRecipesActions.getAllRecipes(this.props.cookId);
			}
		}.bind(this));
	}

	componentWillUnmount() {
		ProfileRecipesStore.unlisten(this.onChange);
		NavbarStore.unlisten(this.onChange);
		RecipeModalStore.unlisten(this.onChange);
	}

	componentWillReceiveProps(newProps) {
		ProfileRecipesActions.getRecipes(newProps.cookId);
	}

	onChange(state) {
		this.setState(state, function() {
			this.masonry.masonry('reloadItems');
			this.masonry.masonry();
		});
	}

	PostRecipeHandler(event) {
		event.preventDefault();
		ProfileRecipesActions.addRecipe( this.state.formData);
	}

	render() {
		let recipesList = this.state.recipes.map((recipe, index) => {
			let imgUrl = '/images/meal-icon.png';
			let imgHeight = 140;
			let imgWidth = 213
			if( recipe.mainPhoto != null && recipe.mainPhoto != "" ) {
				imgUrl = '/file/' + recipe.mainPhoto.metadata.thumbs.w320.id;
				imgHeight = recipe.mainPhoto.metadata.thumbs.w320.height * 213/320;
				imgWidth = 213;
			}
			let recipeUrl = '/recipe/' + recipe.contentId;
			let recipeDesc = trim_words(recipe.recipe.description, 17, '..' );
			let recipeImg = null;

			return(
				<div key={recipe._id} className="grid-item recipe-grid-item">
					<div className="photo">
						<Link to={recipeUrl}>
							<img src={imgUrl} width={imgWidth} height={imgHeight} />
						</Link>
						<Link state={{ modal: true, returnTo: this.props.location.pathname }} className="ghim-btn" to={recipeUrl + '/ghim'}>
							<i className="fa fa-thumb-tack"></i>
							<span className="txt">Ghim</span>
						</Link>
					</div>
					<div className="recipe-info">
						<h3 className="recipe-title">
							<Link to={recipeUrl}>
								{recipe.recipe.title}
							</Link>
						</h3>
						{recipeDesc}
					</div>
					<div className="user-info">

					</div>
				</div>
			);
		});
		var categoriesOptions = this.state.categories;
		return (
			<div className="ProfileRecipes">
				<Helmet
					htmlAttributes={{"lang": "vi", "amp": undefined}} // amp takes no value
					title="My Title"
				/>
					<div className="container">
						<div className="grid">
							<div className="grid-sizer"></div>
							<div className="gutter-sizer"></div>
							{ _.isEmpty(this.state.myInfo) && this.state.myInfo.username != this.props.params.id ? null :
								<div className="grid-item recipe-grid-item">
									<a href="#" className="add-recipe-toggle" data-toggle="modal" data-target="#myModal">
										<i className="fa fa-plus-circle"></i>
										<span>Thêm công thức mới</span>
									</a>
									<RecipeModal
										handleSubmit={this.PostRecipeHandler.bind(this)}
									/>
								</div>
							}
							{recipesList}
						</div>
					</div>
			</div>
		);
	}
}

export default ProfileRecipes;
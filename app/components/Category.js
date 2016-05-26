import React from 'react';
import {Link} from 'react-router';
import CategoryActions from '../actions/CategoryActions';
import CategoryStore from '../stores/CategoryStore';
import RecipeSmall from './inc/RecipeSmall';
import Helpers from '../helpers';

class Category extends React.Component {
	constructor(props) {
		super(props);
		this.state = Object.assign( CategoryStore.getState() );
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		CategoryStore.listen(this.onChange);
		CategoryActions.getCategory(this.props.params.categoryId);
		CategoryActions.getCategoryRecipes(this.props.params.categoryId);
		this.masonry = $('.grid').masonry({
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			itemSelector: '.grid-item',
			fitWidth: true
		});
	}

	componentWillUnmount() {
		CategoryStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state, function() {
			this.masonry.masonry('reloadItems');
			this.masonry.masonry();
		});
	}

	render() {
		let recipesList = null;
		recipesList = this.state.recipes.map((recipe) => {
			let recipeImg = null;
			if( recipe.mainPhoto != null ) {
				recipeImg = recipe.mainPhoto.metadata.thumbs.s320.id;
			}
			return(
				<RecipeSmall
					key={recipe._id}
					recipeUrl={'/recipe/' + recipe.contentId}
					imgId={recipeImg}
					imgWidth="213"
					imgHeight="213"
					recipeTitle={recipe.recipe.title}
					class="recipe-grid-item grid-item"
					location={this.props.location}
				/>
			);
		});
		return (
			<div id="Category">
				<header className="category-header">
					<div className="container">
						<h1>{this.state.category.name}</h1>
					</div>
				</header>
				<div className="container">
					<div className="grid">
						<div className="grid-sizer"></div>
						<div className="gutter-sizer"></div>
						{recipesList}
					</div>
				</div>
			</div>
		);
	}
}

export default Category;
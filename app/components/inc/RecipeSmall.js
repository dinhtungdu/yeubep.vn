import React from 'react';
import {Link} from 'react-router';
import StarRatingComponent from 'react-star-rating-component';

class RecipeSmall extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="recipe-small-item recipe-grid-item side-grid-item" key={this.props.key}>
				<div className="photo">
					<Link to={this.props.recipeUrl}>
						<img src={this.props.imgUrl} width={this.props.imgWidth} height={this.props.imgHeight} />
					</Link>
				</div>
				<div className="recipe-info">
					<h4 className="recipe-title">
						<Link to={this.props.recipeUrl}>
							{this.props.recipeTitle}
						</Link>
					</h4>
					<StarRatingComponent
						name="recipeRating"
						editing={false}
						starCount={5}
						value={4}
					/>
				</div>
			</div>
		);
	}
}

export default RecipeSmall;
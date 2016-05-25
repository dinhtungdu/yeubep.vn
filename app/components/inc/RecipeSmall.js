import React from 'react';
import Helpers from '../../helpers';
import {Link} from 'react-router';
import StarRatingComponent from 'react-star-rating-component';

class RecipeSmall extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var imgUrl = Helpers.img_url(this.props.imgId);
		return(
			<div className={this.props.class} key={this.props.key}>
				<div className="photo">
					<Link to={this.props.recipeUrl}>
						<img src={imgUrl} width={this.props.imgWidth} height={this.props.imgHeight} />
					</Link>
					<Link state={{ modal: true, returnTo: this.props.location.pathname }} className="ghim-btn" to={this.props.recipeUrl + '/ghim'}>
						<i className="fa fa-thumb-tack"></i>
						<span className="txt">Ghim</span>
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
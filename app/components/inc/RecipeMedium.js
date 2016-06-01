import React from 'react';
import Helpers from '../../helpers';
import {Link} from 'react-router';
import StarRatingComponent from 'react-star-rating-component';
import AvatarUsername from './AvatarUsername';

class RecipeMedium extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let imgUrl = '/images/df-img-sm.jpg';
		if( this.props.recipe.mainPhoto != null ) {
			imgUrl = Helpers.img_url(this.props.recipe.mainPhoto.metadata.thumbs.s320.id);
		}
		let recipeUrl = '/recipe/' + this.props.recipe.contentId;
		return(
			<div className={this.props.class} key={this.props.recipe._id.toString()}>
				<div className="photo">
					<Link to={recipeUrl}>
						<img src={imgUrl} width="320" height="320"/>
					</Link>
					<Link state={{ modal: true, returnTo: this.props.location.pathname }} className="ghim-btn" to={recipeUrl + '/ghim'}>
						<i className="fa fa-thumb-tack"></i>
						<span className="txt">Ghim</span>
					</Link>
				</div>
				<div className="recipe-info">
					<AvatarUsername size="40" owner={this.props.recipe.userId} />
					<h4 className="recipe-title">
						<Link to={recipeUrl}>
							{this.props.recipe.recipe.title}
						</Link>
					</h4>
					<p className="recipe-desc">{this.props.recipe.recipe.description}</p>
					<Link className="readmore" to={recipeUrl}>Xem cách làm</Link>
				</div>
			</div>
		);
	}
}

export default RecipeMedium;
import React from 'react';
import {Link} from 'react-router';

class Collection extends React.Component {
	render() {
		if( this.props.collection.recipes.length == 0 ) {
			return(
				<Link to={'/collections/' + this.props.collection.collectionId} className={this.props.class}>
					<h2>{this.props.collection.title}</h2>
					<div className="list">
						<div className="big">
							<img src="/images/df-img.jpg" height="193" width="193" />
						</div>
						<div className="small">
							<img src="/images/df-img-sm.jpg" />
							<img src="/images/df-img-sm.jpg" />
							<img src="/images/df-img-sm.jpg" />
						</div>
					</div>
				</Link>
			);
		} else {
			let smallImages = '';
			let bigThumb = '/images/df-img.jpg';
			if(this.props.collection.recipes[0].recipeId != null) {
				bigThumb = '/file/' + this.props.collection.recipes[0].recipeId.mainPhoto.metadata.thumbs.s320.id;
			}
			smallImages = this.props.collection.recipes.map((recipe, index) => {
				if(index == 0 ) { return; }
				if(index > 3 ) { return; }
				let recipePhoto = '/images/df-img-sm.jpg';
				if(recipe.recipeId != null) {
					if(recipe.recipeId.mainPhoto != null) {
						recipePhoto = '/file/' + recipe.recipeId.mainPhoto.metadata.thumbs.s320.id;
					}
				}
				return(<img key={recipe._id} src={recipePhoto} />);
			});
			return(
				<Link to={'/collections/' + this.props.collection.collectionId} className={this.props.class}>
					<h2>{this.props.collection.title}</h2>
					<div className="list">
						<div className="big">
							<img src={bigThumb} height="193" width="193" />
						</div>
						<div className="small clearfix">
							{smallImages}
							<div className="placehoder small">
								<img src="/images/df-img-sm.jpg" />
								<img src="/images/df-img-sm.jpg" />
								<img src="/images/df-img-sm.jpg" />
							</div>
						</div>
					</div>
				</Link>
			);
		}
	}
}

export default Collection;
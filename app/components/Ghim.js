import React from 'react';
import NavbarStore from '../stores/NavbarStore';
import GhimStore from '../stores/GhimStore';
import GhimActions from '../actions/GhimActions';

class Ghim extends React.Component {
	constructor(props) {
		super(props);
		this.state = Object.assign( GhimStore.getState(), NavbarStore.getState() );
		this.onChange = this.onChange.bind(this);
		this.oneTime = true;
	}

	componentDidMount() {
		let self = this;
		GhimStore.listen(this.onChange);
		NavbarStore.listen(this.onChange);
		GhimActions.getRecipe(this.props.params.recipeId);
	}

	onChange(state) {
		this.setState(state);
		if( this.state.currentUserId != '' && this.oneTime) {
			this.oneTime = false;
			GhimActions.getCollections(this.state.currentUserId);
		}
	}

	handleGhim(collectionId) {
		//console.log(collectionId);
		let dataToSend = {
			recipeId: this.state.recipe._id,
			collectionId: collectionId
		}
		GhimActions.addToCollection(dataToSend);
	}

	render() {
		return (
			<div id="Ghim" className="container">
				<div className="row">
					<div className="col-sm-5">
						<img src={this.state.recipe.photo} alt=""/>
						<h3>{this.state.recipe.title}</h3>
						<p>{this.state.recipe.description}</p>
					</div>
					<div className="col-sm-7">
						<h3>Chọn bộ sưu tập</h3>
						<ul>
							{this.state.collections.map(collection =>
								<li key={collection._id}>
									<img src="/images/df-img-sm.jpg" />
									<span className="collection-name">{collection.title}</span>
									<button className="ghim-btn" onClick={this.handleGhim.bind(this, collection._id)}><i className="fa fa-thumb-tack"></i> Ghim</button>
								</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Ghim;
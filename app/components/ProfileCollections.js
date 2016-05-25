import React from 'react';
import {Link} from 'react-router';
import ProfileCollectionsStore from '../stores/ProfileCollectionsStore';
import ProfileCollectionsActions from '../actions/ProfileCollectionsActions';
import NavbarStore from '../stores/NavbarStore';
//import Helpers from '../helpers';
import AddCollectionModal from './inc/AddCollectionModal';
import AddCollectionButton from './inc/AddCollectionButton';
import CollectionSmall from './inc/CollectionSmall';

class ProfileCollections extends React.Component {

	constructor(props) {
		super(props);
		this.state = Object.assign( ProfileCollectionsStore.getState(), NavbarStore.getState() );
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		ProfileCollectionsStore.listen(this.onChange);
		NavbarStore.listen(this.onChange);
		ProfileCollectionsActions.getCollections(this.props.cookId);
		this.masonry = $('.grid').masonry({
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			itemSelector: '.grid-item',
			fitWidth: true
		});
	}

	componentWillReceiveProps(newProps) {
		ProfileCollectionsActions.getCollections(newProps.cookId);
	}

	componentWillUnmount() {
		ProfileCollectionsStore.unlisten(this.onChange);
		NavbarStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state, function() {
			this.masonry.masonry('reloadItems');
			this.masonry.masonry();
		});
	}

	addCollectionHandler(event) {
		event.preventDefault();
		let dataToSend = {
			title: $('#collectionName').val(),
			desc: $('#collectionDesc').val()
		};
		ProfileCollectionsActions.addCollection(dataToSend);
	}

	render() {
		let collectionsList = null;
		if( this.state.collections != null) {
			collectionsList = this.state.collections.map((collection, index) => {
				return(
					<CollectionSmall
						key={collection.collectionId}
						collection={collection}
						class="collection collection-grid-item grid-item"
					/>
				);
			});
		}

		return (
			<div className="ProfileCollections">
				<div className="container">
					<div className="grid">
						<div className="grid-sizer"></div>
						<div className="gutter-sizer"></div>
						<AddCollectionButton
							currentUser={this.state.currentUserId}
							currentCook={this.props.cookId}
						/>
						{collectionsList}
					</div>
				</div>
				<AddCollectionModal
					handleSubmit={this.addCollectionHandler.bind(this)}
				/>
			</div>
		);
	}
}

export default ProfileCollections;
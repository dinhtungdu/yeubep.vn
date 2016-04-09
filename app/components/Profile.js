import React from 'react';
import {Link} from 'react-router';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import _ from 'underscore';
import UserCover from './inc/UserCover';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = ProfileStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		ProfileStore.listen(this.onChange);
		ProfileActions.getCook(this.props.params.id);
	}

	onChange(state) {
		this.setState(state);
	}
	render() {
		var userPicture = '/images/df-avatar.png';
		var userName = '';
		if( _.isEmpty( this.state.cook) == false ) {
			userPicture = 'http://graph.facebook.com/v2.5/' + this.state.cook.facebook.id + '/picture?height=400&width=400';
			userName = this.state.cook.name;
		}
		return (
			<div className="Profile">
				<UserCover userPicture={userPicture} userName={userName} />
				{this.props.children}
			</div>
		);
	}
}

export default Profile;
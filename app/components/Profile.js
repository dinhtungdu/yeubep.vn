import React from 'react';
import {Link} from 'react-router';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import _ from 'underscore';
import UserCover from './inc/UserCover';

class Profile extends React.Component {
	//static childContextTypes = {
	//	userId: React.PropTypes.string
	//	}
	//getChildContext() {
	//	var self = this;
	//	return {
	//		userId: self.state.userId
	//	};
	//}
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
		var userId = '';
		if( _.isEmpty( this.state.cook) == false ) {
			userPicture = 'http://graph.facebook.com/v2.5/' + this.state.cook.facebook.id + '/picture?height=400&width=400';
			userName = this.state.cook.name;
			userId = this.state.cook.username;
		}
		return (
			<div className="Profile">
				<UserCover
					userPicture={userPicture}
					userName={userName}
					userId={userId}
					current={this.props.location.pathname}
				/>
				{React.cloneElement(this.props.children, { cookId: this.state.cook._id })}
			</div>
		);
	}
}

export default Profile;
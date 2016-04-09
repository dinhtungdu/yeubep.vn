import React from 'react';
import {Link} from 'react-router';
import Helper from '../../../helpers';
import _ from 'underscore';

class UserCover extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		var coverStyle = {
			backgroundImage: 'url(' + this.props.userPicture + ')'
		};
		return(
			<div className="user-cover-wrap">
				<div className="user-cover" style={coverStyle}></div>
				<div className="dark-cover"></div>
				<div className="container text-center">
					<img src={this.props.userPicture} width="140" height="140" />
					<span className="user-name">{this.props.userName}</span>
				</div>
			</div>
		);
	}
}

export default UserCover;
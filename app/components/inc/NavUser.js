import React from 'react';
import {Link} from 'react-router';
import Helper from '../../../helpers';
import _ from 'underscore';

class NavUser extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if( this.props.userLoggedIn ) {
			return(
			<li className='nav-item userblock logged-in'>
				<a className="nav-link" href={this.props.userLink}>
					<img src={this.props.avatarLink} with="35" height="35" />
				</a>
			</li>
			);
		}
		else {
			return(
				<li className='nav-item userblock'>
					<a className="nav-link" href={this.props.userLink}>
						Đăng nhập
					</a>
				</li>
			);
		}
	}
}

export default NavUser;
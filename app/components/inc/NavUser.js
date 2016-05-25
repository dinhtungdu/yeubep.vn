import React from 'react';
import {Link} from 'react-router';
import Helper from '../../../helpers';
import _ from 'underscore';

class NavUser extends React.Component {
	constructor(props) {
		super(props);
	}

	facebookLogin() {
		var url = '/auth/facebook',
			width = 400,
			height = 500,
			top = (window.outerHeight - height) / 2,
			left = (window.outerWidth - width) / 2;
		window.open(url, 'facebook_login', 'width=' + width + ',height=' + height + ',scrollbars=0,top=' + top + ',left=' + left);
	}

	render() {
		if( this.props.userLoggedIn ) {
			return(
			<li className='nav-item userblock logged-in'>
				<Link className="nav-link" to={this.props.userLink}>
					<img src={this.props.avatarLink} with="35" height="35" />
				</Link>
			</li>
			);
		}
		else {
			return(
				<li className='nav-item userblock'>
					<a className="nav-link" href="javascript:void(0)" onClick={this.facebookLogin}>
						Đăng nhập
					</a>
				</li>
			);
		}
	}
}

export default NavUser;
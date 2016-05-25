import React from 'react';
import {Link} from 'react-router';
import Helper from '../../helpers';
import _ from 'underscore';

class NavUser extends React.Component {
	constructor(props) {
		super(props);
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
					<a className="nav-link" href="javascript:void(0)" onClick={Helper.facebookLogin}>
						Đăng nhập
					</a>
				</li>
			);
		}
	}
}

export default NavUser;
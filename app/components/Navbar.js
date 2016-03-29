import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import Helper from '../../helpers';
import _ from 'underscore';
import NavUser from './inc/NavUser';

class Navbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = NavbarStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		NavbarStore.listen(this.onChange);
		NavbarActions.getMyInfo();
	}

	onChange(state) {
		this.setState(state);
	}
	render() {
		var userLoggedIn = false,
			userLink = '/auth/facebook',
			avatarLink = '/images/df-avatar-sm.png';
		if( _.isEmpty( this.state.myInfo) == false ) {
			userLoggedIn = true;
			userLink = '#';
			if( this.state.myInfo.avatarId != '' )	{
				avatarLink = '/file/' + this.state.myInfo.avatarId;
			}
		}

		return (
			<nav className="navbar navbar-light navbar-fixed-top bg-faded">
				<div className="container">
				<a className="navbar-brand" href="#">Yêu Bếp</a>
				<ul className="nav navbar-nav pull-right">
					<li className="nav-item">
						<a className="nav-link" href="#"><i className="fa fa-globe"></i></a>
					</li>
					<NavUser userLoggedIn={userLoggedIn} userLink={userLink} avatarLink={avatarLink} />
				</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
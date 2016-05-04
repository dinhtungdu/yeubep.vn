import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
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
		window.addEventListener('message', function(event){
			if(event.data == 'loggedIn') {
				NavbarActions.getMyInfo();
			}
		});
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		var userLoggedIn = false,
			userLink = '/auth/facebook';
		if( _.isEmpty( this.state.myInfo) == false ) {
			userLoggedIn = true;
			userLink = '/cook/' + this.state.myInfo.username;
		}

		return (
			<nav className="navbar navbar-light navbar-fixed-top bg-faded">
				<div className="container">
				<Link className="navbar-brand" to='/'>Yêu Bếp</Link>
				<ul className="nav navbar-nav pull-right">
					<li className="nav-item">
						<a className="nav-link" href="#"><i className="fa fa-globe"></i></a>
					</li>
					<NavUser userLoggedIn={userLoggedIn} userLink={userLink} avatarLink={this.state.current_user_avatar} />
				</ul>
				</div>
			</nav>
		);
	}
}

export default Navbar;
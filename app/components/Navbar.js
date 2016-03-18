import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';

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
		var imgUrl = '/file/' + this.state.myInfo.avatarId;
		return (
			<div className='navbar'>
				<img src={imgUrl} />
			</div>
		);
	}
}

export default Navbar;
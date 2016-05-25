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
					<ul className="nav nav-inline">
						{'/cook/' + this.props.userId == this.props.current ?
							<Link to={'/cook/' + this.props.userId} className="active nav-link">Bộ sưu tập</Link>
							:
							<Link to={'/cook/' + this.props.userId} className="nav-link">Bộ sưu tập</Link>
						}
						{'/cook/' + this.props.userId + '/recipes' == this.props.current ?
							<Link to={'/cook/' + this.props.userId + '/recipes'} className="active nav-link">Công thức</Link>
							:
							<Link to={'/cook/' + this.props.userId + '/recipes'} className="nav-link">Công thức</Link>
						}
					</ul>
				</div>
			</div>
		);
	}
}

export default UserCover;
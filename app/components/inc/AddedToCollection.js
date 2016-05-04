import React from 'react';
import {Link} from 'react-router';
import Helper from '../../helpers';

class AddedToCollection extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		let avatar = Helper.fb_avatar(this.props.user.facebook.id, 80, 80);
		//let avatar ="#";
		return(
			<div className="added-to-collection" key={this.props.key}>
				<Link className="user" to={'/cook/' + this.props.user.username}>
					<img className="circle-img" src={avatar} />
				</Link>
				<div className="info">
					<Link className="user" to={'/cook/' + this.props.user.username}>
						<span className="name">{this.props.user.name}</span>
					</Link>
					<span className="action"> đã thêm vào </span>
					<Link to={this.props.collectionUrl} className="collection">{this.props.collectionTitle}</Link>
					<time>14/04/2016</time>
				</div>
			</div>
		);
	}
}

export default AddedToCollection;
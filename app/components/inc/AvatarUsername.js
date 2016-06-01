import React from 'react';
import {Link} from 'react-router';
import Helper from '../../helpers';

class AvatarUsername extends React.Component {
	render() {
		//let avatar = '/images/df-avatar-sm.png';
		let avatar = Helper.fb_avatar(this.props.owner.facebook.id, 50, 50);
		let size = 25;
		if( this.props.size ) {
			size = this.props.size;
		}
		let nameStyle = {
			color: '#333',
			fontWeight: 'bold',
			fontSize: '0.85rem'
		}
		let imgStyle = {
			borderRadius: '100%',
			marginRight: '5px'
		}
		return(
			<Link style={{marginBottom: '1rem', display: 'block'}} to={'/cook/' + this.props.owner.username} className="avatar-block">
				<img style={imgStyle} src={avatar} width={size} height={size} />
				<span style={nameStyle}>{this.props.owner.name}</span>
			</Link>
		);
	}
}

export default AvatarUsername;
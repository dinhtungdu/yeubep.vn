import React from 'react';
import {Link} from 'react-router';
import _ from 'underscore';

class LikeButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			likeState: props.likeState
		};
		if(props.likeState == 'like') {
			this.state.likeLabel = 'Bỏ thích';
		} else {
			this.state.likeLabel = 'Thích';
		}
	}

	componentWillReceiveProps(newprops) {
		if( newprops.likeState.toString() == "like" ) {
			this.setState({
				likeState: 'like',
				likeLabel: 'Bỏ thích'
			});
		} else {
			this.setState({
				likeState: 'dislike',
				likeLabel: 'Thích'
			});
		}
	}

	render() {
		return(
			<a href="#" className={this.state.likeState + ' like-button'} onClick={this.props.handleLike}>
				<i className="fa fa-heart"></i>
				<span className="txt">{this.state.likeLabel}</span>
			</a>
		);
	}
}

export default LikeButton;
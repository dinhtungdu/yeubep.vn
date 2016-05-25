import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../../stores/NavbarStore';
import Helper from '../../helpers';
import _ from 'underscore';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';

class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = NavbarStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		NavbarStore.listen(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		var commentTime = moment(this.props.comment.createdAt);
		var avatar = Helper.fb_avatar(this.props.comment.userId.facebook.id, 128, 128);
		return(
			<div className="comment-item" key={this.props.key}>
					<Link className="thumb" to={'/cook/' + this.props.comment.userId.username}>
						<img className="avatar" src={avatar} width="64" height="64" />
					</Link>
					<div className="comment-body">
						<Link to={'/cook/' + this.props.comment.userId.username}>
							<span className="username">{this.props.comment.userId.name}</span>
						</Link>
						<span className="txt">{this.props.comment.body}</span>
						<div className="meta clearfix">
							<span className="date">
									<i className="fa fa-calendar-check-o"></i> {commentTime.format('D/M/YYYY')}
							</span>
						</div>
					</div>
			</div>
		);
	}
}

export default Comment;
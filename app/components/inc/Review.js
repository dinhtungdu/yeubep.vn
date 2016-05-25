import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../../stores/NavbarStore';
import Helper from '../../helpers';
import _ from 'underscore';
import StarRatingComponent from 'react-star-rating-component';
import moment from 'moment';

class Review extends React.Component {
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
		var commentTime = moment(this.props.time);
		var avatar = Helper.fb_avatar(this.props.user.facebook.id, 128, 128);
		var likeClass = '';
		if( _.indexOf(this.props.likes, this.state.currentUserId) >= 0 ) {
			likeClass = 'liked';
		}
		return(
			<div className="review-item container-fluid" key={this.props.key}>
				<div className="row">
					<div className="col-sm-2">
						<a href={'/cook/' + this.props.user.username}>
							<img className="avatar" src={avatar} width="64" height="64" />
							<span className="username">{this.props.user.name}</span>
						</a>
					</div>
					<div className="col-sm-10">
						<div className="review-body">
							<div className="meta clearfix">
								<div className="rating-score">
									<span className="score">{this.props.rating}</span>
									<span className="total">/5</span>
								</div>
								<StarRatingComponent
									name="recipeRating"
									editing={false}
									starCount={5}
									value={this.props.rating}
								/>
								<span className="date pull-right">
										<i className="fa fa-calendar-check-o"></i> {commentTime.format('D/M/YYYY')}
								</span>
							</div>
							<p>
								{this.props.body}
							</p>
						</div>
						<div className="like">
							<a className={likeClass} href="javascript:void(0)" onClick={this.props.handleLike}><i className="fa fa-heart-o"></i></a>
							<span className="count">{this.props.likeCount}</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Review;
import React from 'react';
import {Link} from 'react-router';
import Helper from '../../../helpers';
import _ from 'underscore';
import StarRatingComponent from 'react-star-rating-component';

class Review extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div className="review-item container-fluid" key={this.props.key}>
				<div className="row">
					<div className="col-sm-2">
						<a href="">
							<img className="avatar" src="/images/df-avatar.png" width="64" height="64" />
						</a>
					</div>
					<div className="col-sm-10">
						<div className="review-body">
							<div className="meta clearfix">
								<div className="rating-score">
									<span className="score">4</span>
									<span className="total">/5</span>
								</div>
								<StarRatingComponent
									name="recipeRating"
									editing={false}
									starCount={5}
									value={4}
								/>
								<span className="date pull-right">
										<i className="fa fa-calendar-check-o"></i> 26/10/2001
								</span>
							</div>
							<p>I have ordered from coastal.com four times. The first time I got Vera Wang frames for only the price of shipping as an introductory offer. They arrived in less than a week, and I was very pleased. The second time I ordered contacts. The price wasn't very competitive, and they took a couple of weeks to arrive. The third time I ordered two sets of frames. The prices were more than reasonable, and one pair arrived in a little over two weeks, the second in three weeks.
								This last time, I ord...</p>
						</div>
						<div className="like">
							<a href="#"><i className="fa fa-thumbs-o-up"></i> Hữu ích</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Review;
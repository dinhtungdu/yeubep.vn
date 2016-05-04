import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class AddReviewModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rating: 1
		}
	}

	componentDidMount() {
	}

	onStarClick(name, value) {
		this.setState({rating: value});
	}

	render() {
		return (
			<div className="AddReviewModal">
				<div className="modal fade" id="addReviewModal" tabIndex="-1" role="dialog" aria-labelledby="addReviewModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content add-recipe">
							<div id="add-recipe-bg"></div>
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="addReviewModalLabel">Đánh giá công thức: {this.props.recipeTitle}</h4>
							</div>
							<div className="modal-body">
								<form className="container-fluid clearfix">
									<div className="form-group row">
										<label className="col-sm-3 form-control-label">Bạn cho công thức này mấy sao?</label>
										<div className="col-sm-9">
											<StarRatingComponent
												name="recipeRating"
												starCount={5}
												value={this.state.rating}
												onStarClick={this.onStarClick.bind(this)}
											/>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-sm-3 form-control-label">Nhận xét của bạn về công thức này?</label>
										<div className="col-sm-9">
											<textarea rows="4" name="recipeReview" className="form-control"></textarea>
										</div>
									</div>
									<button type="submit" className="btn btn-sm btn-primary recipe-submit pull-right">Nhận xét</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddReviewModal;
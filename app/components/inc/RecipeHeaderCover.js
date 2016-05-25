import React from 'react';
import {Link} from 'react-router';
import moment from 'moment';

class RecipeHeaderCover extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOwner: false,
			likeCount: props.likeCount,
			photoCount: props.photoCount
		}
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			isOwner: nextProps.isOwner,
			recipeOwner: nextProps.recipeOwner,
			likeCount: nextProps.likeCount,
			photoCount: nextProps.photoCount
		});
	}

	render() {
		var recipeTime = moment(this.props.recipeTime);
		var coverStyle = {
			backgroundImage: 'url(' + this.props.recipePhoto + ')'
		};
		return(
			<div className="user-cover-wrap">
				<div className="user-cover recipe-cover" style={coverStyle}></div>
				<div className="container">
					<div className="row">
						<div className="col-md-9 text-xs-center text-md-left">
							<div className="row">
								<div className="col-md-4">
									<img src={this.props.recipePhoto} width="200" height="200" className="recipe-thumb img-circle" />
								</div>
								<div className="col-md-8">
									<div className="info">
										<h1>
											{this.props.recipeTitle}
											{this.state.isOwner ?
												<div className="owner-only">
													<a href="#" className="edit-recipe-toggle" data-toggle="modal" data-target="#myModal">
														<span>Chỉnh sửa</span>
													</a>
													<a href="javascript:void(0)" className="delete-recipe edit-recipe-toggle" onClick={this.props.handleDelete}>
														<span>Xóa</span>
													</a>
												</div>
												: null
											}
										</h1>
										<p>{this.props.recipeDesc}</p>
										<div className="counter">
											<div className="item">
												<span className="bg">
													<i className="fa fa-heart"></i>
												</span>
												<span className="number">{this.state.likeCount}</span>
											</div>
											<a href="javascript:void(0)" onClick={this.props.onClickPhoto} className="item">
												<span className="bg">
													<i className="fa fa-photo"></i>
												</span>
												<span className="number">{this.state.photoCount}</span>
											</a>
											<a href="javascript:void(0)" onClick={this.props.onClickPhoto} className="item">
												<span className="bg">
													<i className="spoon"></i>
												</span>
												<span className="number">{this.props.madeCount}</span>
											</a>
											<div className="item">
												<span className="bg">
													<i className="fa fa-comment"></i>
												</span>
												<span className="number">{this.props.commentCount}</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-3">
							<div className="userInfo">
								{ typeof this.state.recipeOwner == 'undefined' ? null :
									<Link to={'/cook/' + this.state.recipeOwner.username} className="avatar clearfix">
										<img
											src={'http://graph.facebook.com/v2.5/' + this.state.recipeOwner.facebook.id + '/picture?height=80&width=80'}/>
										<span className="username">{this.state.recipeOwner.name}</span>
									</Link>
								}
								<div className="date">
									<i className="fa fa-calendar-check-o"></i>
									<span>{recipeTime.format('D/M/YYYY')}</span>
									<br />
									<i className="fa fa-clock-o"></i>
									<span>{recipeTime.format('HH:mm')}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default RecipeHeaderCover;
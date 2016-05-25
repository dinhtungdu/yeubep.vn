import React from 'react';
import {Link} from 'react-router';
import CommentFormActions from '../actions/CommentFormActions';
import Helpers from '../helpers';
import _ from 'underscore';
import NavbarStore from '../stores/NavbarStore';

class CommentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = Object.assign( NavbarStore.getState() );
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		NavbarStore.listen(this.onChange);
	}

	componentWillUnmount() {
		NavbarStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	handleSubmit(event) {
		event.preventDefault();
		if(this.state.currentUserId == '') {
			Helpers.facebookLogin();
			return;
		}
		if(this.props.type == 'collection') {
			CommentFormActions.addCollectionComment({
				commentBody: $('#commentBody').val(),
				postId: this.props.contentId
			})
		}
	}

	render() {
		return(
			<form id="master-comment-form" className="clearfix" onSubmit={this.handleSubmit.bind(this)} >
				<textarea required rows="2" id="commentBody" name="commentBody" className="form-control"></textarea>
				<button type="submit" className="pull-right btn button-orange button-tiny">
					{this.state.currentUserId == '' ?
						<span>Đăng nhập để nhận xét</span>
					:
						<span>Gửi</span>
					}
				</button>
			</form>
		);
	}
}

export default CommentForm;
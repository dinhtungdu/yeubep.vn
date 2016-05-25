import React from 'react';
import {Link} from 'react-router';
import _ from 'underscore';
import ReactDOM from 'react-dom';
class Modal extends React.Component {
	componentDidMount() {
		let self = this;
		$('#GeneralModal').modal('show');
		$('#GeneralModal').on('hide.bs.modal', function (e) {
			window.location.replace(self.props.returnTo);
		});
	}
	render() {
		return(
			<div className="ModalWrap">
				<link to={this.props.returnTo} className="take-me-back" />
				<div className="modal fade" id="GeneralModal" tabIndex="-1" role="dialog" aria-labelledby="addReviewModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content add-recipe">
							{this.props.children}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Modal;

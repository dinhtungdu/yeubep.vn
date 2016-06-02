import React from 'react';

class AddCollectionModal extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
	}
	
	render() {
		return (
			<div className="AddCollectionModal">
				<div className="modal fade" id="addCollectionModal" tabIndex="-1" role="dialog" aria-labelledby="addCollectionModalLabel" aria-hidden="true">
					<div className="modal-dialog" role="document">
						<div className="modal-content add-recipe">
							<div id="add-recipe-bg"></div>
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="addCollectionModalLabel">Thêm bộ sưu tập mới</h4>
							</div>
							<div className="modal-body">
								<form className="container-fluid clearfix" onSubmit={this.props.handleSubmit}>
									<div className="form-group row">
										<label className="col-sm-3 form-control-label">Tên bộ sưu tập</label>
										<div className="col-sm-9">
											<input
												className="form-control"
												type="text"
												name="collectionName"
												id="collectionName"
												required
											/>
										</div>
									</div>
									<div className="form-group row">
										<label className="col-sm-3 form-control-label">Giới thiệu về bộ sưu tập</label>
										<div className="col-sm-9">
											<textarea rows="4" id="collectionDesc" name="collectionDesc" className="form-control"></textarea>
										</div>
									</div>
									<button type="submit" className="btn btn-sm btn-primary recipe-submit pull-right">Thêm bộ sưu tập</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddCollectionModal;
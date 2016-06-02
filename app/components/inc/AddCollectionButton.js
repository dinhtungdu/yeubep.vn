import React from 'react';

class AddCollectionButton extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		if(this.props.currentUser == this.props.currentCook) {
			return (
				<div className="AddCollectionButton grid-item">
					<a href="javascript:void(0)" className="add-recipe-toggle" data-toggle="modal" data-target="#addCollectionModal">
						<i className="fa fa-plus-circle"></i>
						<span>Thêm bộ sưu tập mới</span>
					</a>
				</div>
			);
		}
		else {
			return null;
		}
	}
}

export default AddCollectionButton;

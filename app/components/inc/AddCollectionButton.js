import React from 'react';

class AddCollectionButton extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div className="AddCollectionButton grid-item">
				{this.props.currentUser == this.props.currentCook ?
				<a href="javascript:void(0)" className="add-recipe-toggle" data-toggle="modal" data-target="#addCollectionModal">
					<i className="fa fa-plus-circle"></i>
					<span>Thêm bộ sưu tập mới</span>
				</a>
				: null }
			</div>
		);
	}
}

export default AddCollectionButton;

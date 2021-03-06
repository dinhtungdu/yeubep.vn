import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

class AddRecipePhotoModal extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.dropzoneControl();
	}

	dropzoneControl() {
		Dropzone.autoDiscover = false;
		var myDropzone = new Dropzone('#dZAddRecipePhoto', {
			url: "/file/add",
			maxFiles: 1,
			addRemoveLinks: true,
			//acceptedFiles: 'image',
			thumbnailWidth: 260,
			thumbnailHeight: 150,
			dictRemoveFile: '×',
			dictDefaultMessage: 'Kéo ảnh hoặc click vào đây để upload',
			thumbnail: function(file, dataUrl) {
				var thumbnailElement, _i, _len, _ref;
				if (file.previewElement) {
					file.previewElement.classList.remove("dz-file-preview");
					_ref = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
					for (_i = 0, _len = _ref.length; _i < _len; _i++) {
						thumbnailElement = _ref[_i];
						thumbnailElement.alt = file.name;
						thumbnailElement.src = dataUrl;
					}
					return setTimeout(((function(_this) {
						return function() {
							return file.previewElement.classList.add("dz-image-preview");
						};
					})(this)), 1);
				}
				$('#add-recipe-bg').css("background", 'url(' + dataUrl + ')');
			},
			success: function (file, response) {
				file.previewElement.classList.add("dz-success");
				$('#imadeitPhotoId').val(response);
			}
		});
	}

	render() {
		return (
			<div className="AddRecipePhotoModal">
				<div className="modal fade" id="addRecipePhotoModal" tabIndex="-1" role="dialog" aria-labelledby="addRecipePhotoModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-sm" role="document">
						<div className="modal-content add-recipe">
							<div id="add-recipe-bg"></div>
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="addRecipePhotoModalLabel">Thêm ảnh của bạn cho món {this.props.recipeTitle}</h4>
							</div>
							<div className="modal-body clearfix">
								<form onSubmit={this.props.handleSubmit}>
									<div id="dZAddRecipePhoto" className="dropzone">
										<div className="dropzone-previews"></div>
									</div>
									<div className="checkbox">
										<label>
											<input type="checkbox" id="post-to-facebook" defaultChecked /> Đăng lên Facebook
										</label>
									</div>
									<input type="hidden" id="imadeitPhotoId"/>
									<button type="submit" className="btn btn-sm btn-primary recipe-submit pull-right">Đăng</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default AddRecipePhotoModal;
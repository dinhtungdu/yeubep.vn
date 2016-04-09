import React from 'react';
import {Link} from 'react-router';
import ProfileRecipesStore from '../stores/ProfileRecipesStore';
import ProfileRecipesActions from '../actions/ProfileRecipesActions';
import Select from 'react-select';
import validator from 'validator';
import Helmet from 'react-helmet';

class ProfileRecipes extends React.Component {
	constructor(props) {
		super(props);
		this.state = ProfileRecipesStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		ProfileRecipesStore.listen(this.onChange);
		ProfileRecipesActions.getCategories();
	}

	onChange(state) {
		this.setState(state);
	}

	PostRecipeHandler(event) {
		event.preventDefault();
		var mainPhoto = document.getElementById('mainPhoto').value;
		this.state.formData.mainPhoto = mainPhoto;
		ProfileRecipesActions.addRecipe( this.state.formData);
	}

	render() {
		var categoriesOptions = this.state.categories;
		return (
			<div className="ProfileRecipes">
				<Helmet
					htmlAttributes={{"lang": "vi", "amp": undefined}} // amp takes no value
					title="My Title"
				/>
				<button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
					Launch demo modal
				</button>

				<div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
					<div className="modal-dialog modal-lg" role="document">
						<div className="modal-content add-recipe">
							<div id="add-recipe-bg"></div>
							<div className="modal-header">
								<button type="button" className="close" data-dismiss="modal" aria-label="Close">
									<span aria-hidden="true">&times;</span>
								</button>
								<h4 className="modal-title" id="myModalLabel">Thêm công thức mới</h4>
							</div>
							<div className="modal-body">
								<div className="container-fluid">
									<form className="row" encType="multipart/form-data" onSubmit={this.PostRecipeHandler.bind(this)}>
										<div className="col-sm-4 small-col">
											<div className="form-group">
												<div id="dZUpload" className="dropzone">
													<div className="dropzone-previews"></div>
												</div>
											</div>
											<div className="row">
												<div className="col-lg-6">
													<div className="form-group">
														<label htmlFor="prepTime" className="form-control-label">Thời gian chuẩn bị</label>
														<input
															type="number" className="form-control" name="prepTime" id="prepTime"
															value={this.state.formData.prepTime}
															onChange={ProfileRecipesActions.handleChanges}
														/>
													</div>
													<div className="form-group">
														<label htmlFor="cookTime" className="form-control-label">Thời gian nấu</label>
														<input type="number" className="form-control" name="cookTime" id="cookTime"
															 value={this.state.formData.cookTime}
															 onChange={ProfileRecipesActions.handleChanges}
														/>
													</div>
												</div>
												<div className="col-lg-6">
													<div className="form-group">
														<label htmlFor="numberOfServings" className="form-control-label">Phục vụ số người?</label>
														<input type="number" className="form-control" name="numberOfServings" id="numberOfServings"
																	 value={this.state.formData.numberOfServings}
																	 onChange={ProfileRecipesActions.handleChanges}
														/>
													</div>
													<div className="form-group">
														<label htmlFor="category" className="form-control-label">Chuyên mục</label>
														<Select
															name="category"
															value="56fc95543397ccb6ce6614af"
															options={categoriesOptions}
															onChange={ProfileRecipesActions.handleCategoryChange}
														/>
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-8 big-col">
											<div className="form-group">
												<label htmlFor="title" className="form-control-label">Tên công thức</label>
												<input type="text" className="form-control" name="title" id="title"
															 required
															 value={this.state.formData.title}
															 onChange={ProfileRecipesActions.handleChanges}
												/>
											</div>
											<div className="form-group">
												<label htmlFor="description" className="form-control-label">Giới thiệu chút về công thức này nhé</label>
												<textarea type="text" className="form-control" name="description" id="description" rows="2"
																	value={this.state.formData.description}
																	onChange={ProfileRecipesActions.handleChanges}
												/>
											</div>
											<div className="form-group">
												<label htmlFor="ingredients" className="form-control-label">Nguyên liệu cho công thức tuyệt vời này là gì?</label>
												<textarea type="text" className="form-control" name="ingredients" id="ingredients" rows="4" placeholder="Để mỗi nguyên liệu một dòng nhé"
																	required
																	value={this.state.formData.ingredients}
																	onChange={ProfileRecipesActions.handleChanges}
												/>
											</div>
											<div className="form-group">
												<label htmlFor="directions" className="form-control-label">Các bước thực hiện:</label>
												<textarea type="text" className="form-control" name="directions" id="directions" rows="5" placeholder="Mỗi bước thực hiện là một dòng nhé"
																	required
																	value={this.state.formData.directions}
																	onChange={ProfileRecipesActions.handleChanges}
												/>
											</div>
											<div className="form-group">
												<label htmlFor="note" className="form-control-label">Note</label>
												<textarea type="text" className="form-control" name="note" id="note" rows="2" placeholder="Lưu ý, mách nhỏ khi nấu món này."
																	value={this.state.formData.note}
																	onChange={ProfileRecipesActions.handleChanges}
												/>
											</div>
											<div className="form-group ac-custom ac-radio ac-fill">
												<ul>
													<li><input id="r9" name="visible" type="radio" value="private" onChange={ProfileRecipesActions.handleChanges} /><label htmlFor="r9">Bí mật <span className="sublabel">Chỉ bạn mới xem được công thức này</span></label></li>
													<li>
														<input id="r10" name="visible" type="radio" value="public" defaultChecked onChange={ProfileRecipesActions.handleChanges} /><label htmlFor="r10">Công khai <span className="sublabel">Tất cả mọi nguời đều xem được.</span></label>
														<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15.833,24.334c2.179-0.443,4.766-3.995,6.545-5.359 c1.76-1.35,4.144-3.732,6.256-4.339c-3.983,3.844-6.504,9.556-10.047,13.827c-2.325,2.802-5.387,6.153-6.068,9.866 c2.081-0.474,4.484-2.502,6.425-3.488c5.708-2.897,11.316-6.804,16.608-10.418c4.812-3.287,11.13-7.53,13.935-12.905 c-0.759,3.059-3.364,6.421-4.943,9.203c-2.728,4.806-6.064,8.417-9.781,12.446c-6.895,7.477-15.107,14.109-20.779,22.608 c3.515-0.784,7.103-2.996,10.263-4.628c6.455-3.335,12.235-8.381,17.684-13.15c5.495-4.81,10.848-9.68,15.866-14.988 c1.905-2.016,4.178-4.42,5.556-6.838c0.051,1.256-0.604,2.542-1.03,3.672c-1.424,3.767-3.011,7.432-4.723,11.076 c-2.772,5.904-6.312,11.342-9.921,16.763c-3.167,4.757-7.082,8.94-10.854,13.205c-2.456,2.777-4.876,5.977-7.627,8.448 c9.341-7.52,18.965-14.629,27.924-22.656c4.995-4.474,9.557-9.075,13.586-14.446c1.443-1.924,2.427-4.939,3.74-6.56 c-0.446,3.322-2.183,6.878-3.312,10.032c-2.261,6.309-5.352,12.53-8.418,18.482c-3.46,6.719-8.134,12.698-11.954,19.203 c-0.725,1.234-1.833,2.451-2.265,3.77c2.347-0.48,4.812-3.199,7.028-4.286c4.144-2.033,7.787-4.938,11.184-8.072 c3.142-2.9,5.344-6.758,7.925-10.141c1.483-1.944,3.306-4.056,4.341-6.283c0.041,1.102-0.507,2.345-0.876,3.388 c-1.456,4.114-3.369,8.184-5.059,12.212c-1.503,3.583-3.421,7.001-5.277,10.411c-0.967,1.775-2.471,3.528-3.287,5.298 c2.49-1.163,5.229-3.906,7.212-5.828c2.094-2.028,5.027-4.716,6.33-7.335c-0.256,1.47-2.07,3.577-3.02,4.809"></path></svg>
													</li>
												</ul>
											</div>
											<input type="hidden" name="mainPhoto" id="mainPhoto"
														 value={this.state.formData.mainPhoto}
											/>
											<button type="submit" className="btn btn-sm btn-primary recipe-submit">Đăng</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProfileRecipes;
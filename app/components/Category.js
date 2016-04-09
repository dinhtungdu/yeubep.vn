import React from 'react';
import {Link} from 'react-router';
//import CategoryStore from '../stores/CategoryStore';
//import CategoryActions from '../actions/CategoryActions';

class Category extends React.Component {
	constructor(props) {
		super(props);
		//this.state = CategoryStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		//CategoryStore.listen(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}
	render() {
		return (
			<div className="Category">
				This is all recipes page
			</div>
		);
	}
}

export default Category;
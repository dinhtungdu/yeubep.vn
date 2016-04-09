import React from 'react';
import {Link} from 'react-router';
//import RecipeStore from '../stores/RecipeStore';
//import RecipeActions from '../actions/RecipeActions';

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		//this.state = RecipeStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		//RecipeStore.listen(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}
	render() {
		return (
			<div className="Recipe">
				This is a recipe page
			</div>
		);
	}
}

export default Recipe;
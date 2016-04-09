import React from 'react';
import {Link} from 'react-router';
//import RecipesStore from '../stores/RecipesStore';
//import RecipesActions from '../actions/RecipesActions';

class Recipes extends React.Component {
	constructor(props) {
		super(props);
		//this.state = RecipesStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		//RecipesStore.listen(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}
	render() {
		return (
			<div className="Recipes">
				This is all recipes page
			</div>
		);
	}
}

export default Recipes;
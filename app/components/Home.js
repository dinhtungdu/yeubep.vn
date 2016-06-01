import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore';
import HomeActions from '../actions/HomeActions';
import RecipeMedium from './inc/RecipeMedium';

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = HomeStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {
		HomeStore.listen(this.onChange);
		HomeActions.getCategories();
		HomeActions.getRecipes();
	}

	componentWillUnmount() {
		HomeStore.unlisten(this.onChange);
	}

	onChange(state) {
		this.setState(state);
	}

	render() {
		return (
			<div className='Home'>
				<div className="container">
					<div className="row">
						<div className="col-sm-9 col-sm-push-3">
							{ this.state.recipes.map(recipe => <RecipeMedium recipe={recipe} location={this.props.location} class="recipe-medium clearfix recipe-block"/>)}
						</div>
						<div className="sidebar-left col-sm-3 col-sm-pull-9">
							<aside className="category widget">
								<h2 className="widget-tite">Chuyên mục</h2>
								<ul className="nav nav-stacked">
								{ this.state.categories.map(category =>
									<li className="nav-item" key={category.value}>
										<Link className="nav-link" to={'/category/' + category.value}>
											{category.label}
										</Link>
									</li>
								)}
								</ul>
							</aside>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
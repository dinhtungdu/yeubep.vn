import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Profile from './components/Profile';
import ProfileRecipes from './components/ProfileRecipes';
import AuthSuccess from './components/AuthSuccess';
import Recipe from './components/Recipe';
import Recipes from './components/Recipes';
import Category from './components/Category';

export default (
	<Route component={App}>
		<Route path='/' component={Home} />
		<Route path='/auth-okay' component={AuthSuccess} />
		<Route path='/recipes' component={Recipes} />
		<Route path='/category/:id' component={Category} />
		<Route path='/cook/:id' component={Profile}>
			<Route path='recipes' component={ProfileRecipes} />
		</Route>
		<Route path='/recipe/:id' component={Recipe} />
	</Route>
);

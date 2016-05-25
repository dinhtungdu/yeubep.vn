import React from 'react';
import {Route, Redirect, IndexRoute} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Profile from './components/Profile';
import ProfileRecipes from './components/ProfileRecipes';
import AuthSuccess from './components/AuthSuccess';
import Recipe from './components/Recipe';
import Recipes from './components/Recipes';
import Category from './components/Category';
import NotFound from './components/NotFound';
import ProfileCollections from './components/ProfileCollections';
import Collection from './components/Collection';
import Ghim from './components/Ghim';

export default (
	<Route component={App}>
		<Route path='/' component={Home} />
		<Route path='/auth-okay' component={AuthSuccess} />
		<Route path='/khong-tim-thay' component={NotFound} />
		<Route path='/recipes' component={Recipes}/>
		<Route path='/category/:id' component={Category} />
		<Route path='/cook/:id' component={Profile} ignoreScrollBehavior>
			<IndexRoute component={ProfileCollections} />
			<Route path='recipes' component={ProfileRecipes} />
		</Route>
		<Route path='/recipe/:recipeId/ghim' component={Ghim} />
		<Route path='/recipe/:recipeId' component={Recipe} />
		<Route path='/collections/:collectionId' component={Collection} />
		<Redirect from="/*" to="/khong-tim-thay" />
	</Route>
);

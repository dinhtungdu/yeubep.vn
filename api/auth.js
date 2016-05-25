var User = require('../models/user');
var helpers = require('../helpers.js');
module.exports = function(app, passport) {
	'use strict';

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

//	Facebook first login
	app.get('/auth/facebook',
		passport.authenticate('facebook', { scope: ['user_friends', 'email'] }),
		function(req, res) {

			res.status(200);
			res.send(user);
		}
	);
	app.get('/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		function(req, res) {
			// Successful authentication, redirect home.
			res.redirect('/auth-okay');
		});

	app.get('/auth/login-state',
		helpers.isLoggedIn,
		function(req, res) {
			res.send('loggedIn');
		});

	app.get('/auth/me',
		helpers.isLoggedIn,
		function(req, res) {
			res.send(req.user);
		}
	);

	app.get('/auth/user/:id',
		function(req, res, next) {
			User.findOne( { username: req.params.id }, function(err, user) {
				//if(err) { return next(err); }
				if(user == null) {
					return res.status(404).send({message: 'User not found.'});
				}
				return res.send(user);
			});
		});
};
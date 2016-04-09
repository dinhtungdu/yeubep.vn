'use strict';
var async = require('async');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var configAuth = require('./auth');
var helpers = require('../helpers');

module.exports = function (passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	passport.use(new FacebookStrategy({
		clientID : configAuth.facebookAuth.clientID,
		clientSecret : configAuth.facebookAuth.clientSecret,
		callbackURL: "http://localhost:3000/auth/facebook/callback",
		profileFields: ['id', 'displayName', 'name', 'gender', 'birthday', 'profileUrl', 'emails']
		},
		function(accessToken, refreshToken, profile, done) {
			//check user table for anyone with a facebook ID of profile.id
			User.findOne({
				'facebook.id': profile.id
			}, function(err, user) {
				if (err) {
					return done(err);
				}
				//No user was found... so create a new user with values from Facebook (all the profile. stuff)
				if (!user) {
					user = new User({
						name: profile.displayName,
						email: profile._json.email,
						provider: 'facebook',
						facebook: profile._json
					});
					user.save(function(err) {
						if (err) console.log(err);
						return done(err, user);
					});
				} else {
					//found user. Return
					return done(err, user);
				}
			});
		}
	));
};


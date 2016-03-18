'use strict';
var async = require('async');
var FacebookTokenStrategy = require('passport-facebook-token');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');
var configAuth = require('./auth');
var request = require('request');
var upload = require('../controllers/upload');

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
					async.waterfall([
						function(cb) {
							request('http://graph.facebook.com/v2.5/' + profile.id + '/picture?height=200&width=200&redirect=0', function(err, res, body) {
								if( !err && res.statusCode == 200) {
									var info = JSON.parse(body);
									var profilePicUrl = info.data.url;
									var avatarId = upload.createFromUrl(profilePicUrl);
									cb(null, avatarId);
								}
							});
						},
						function(avatarId) {
							user = new User({
								name: profile.displayName,
								email: profile._json.email,
								provider: 'facebook',
								avatarId : avatarId,
								//now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
								facebook: profile._json
							});
							user.save(function(err) {
								if (err) console.log(err);
								return done(err, user);
							});
						}
					]);
				} else {
					//found user. Return
					return done(err, user);
				}
			});
		}
	));
};


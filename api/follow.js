'use strict';
var Hotpot = require('../models/hotpot');
var Comment = require('../models/comment');
var Collect = require('../models/collect');
var helpers = require('../helpers');
var _ = require('underscore');

module.exports = function(app, passport) {
	
	app.put('/api/followcollection/:id',
		helpers.isLoggedIn,
		function (req, res, next) {
			Collect.findById( req.params.id, function (err, collection) {
				if(err) { res.send(err) }
				console.log(_.indexOf(collection.followers, req.user._id.toString(), true));
				if( _.indexOf(collection.followers, req.user._id.toString()) >= 0 ) {
					collection.followers = _.without(collection.followers, req.user._id.toString());
					collection.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('not-followed-yet');
					});
				} else {
					collection.followers.push(req.user._id);
					collection.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('followed');
					});
				}
			});
		}
	);
}
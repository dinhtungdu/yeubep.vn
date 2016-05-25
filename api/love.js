'use strict';
var Hotpot = require('../models/hotpot');
var Comment = require('../models/comment');
var Collect = require('../models/collect');
var helpers = require('../helpers');
var _ = require('underscore');

module.exports = function(app, passport) {
	app.put('/api/love/:id',
		helpers.isLoggedIn,
		function (req, res, next) {
			Hotpot.findById( req.params.id, function (err, hotpot) {
				if(err) { res.send(err) }
				console.log(_.indexOf(hotpot.loves, req.user._id.toString(), true));
				if( _.indexOf(hotpot.loves, req.user._id.toString()) >= 0 ) {
					hotpot.loves = _.without(hotpot.loves, req.user._id.toString());
					hotpot.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('dislike');
					});
				} else {
					hotpot.loves.push(req.user._id);
					hotpot.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('like');
					});
				}
			});
		}
	);
	app.put('/api/lovecomment/:id',
		helpers.isLoggedIn,
		function (req, res, next) {
			Comment.findById( req.params.id, function (err, comment) {
				if(err) { res.send(err) }
				console.log(_.indexOf(comment.loves, req.user._id.toString(), true));
				if( _.indexOf(comment.loves, req.user._id.toString()) >= 0 ) {
					comment.loves = _.without(comment.loves, req.user._id.toString());
					comment.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('dislike');
					});
				} else {
					comment.loves.push(req.user._id);
					comment.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('like');
					});
				}
			});
		}
	);

	app.put('/api/lovecollection/:id',
		helpers.isLoggedIn,
		function (req, res, next) {
			Collect.findById( req.params.id, function (err, collection) {
				if(err) { res.send(err) }
				console.log(_.indexOf(collection.loves, req.user._id.toString(), true));
				if( _.indexOf(collection.loves, req.user._id.toString()) >= 0 ) {
					collection.loves = _.without(collection.loves, req.user._id.toString());
					collection.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('dislike');
					});
				} else {
					collection.loves.push(req.user._id);
					collection.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('like');
					});
				}
			});
		}
	);
}
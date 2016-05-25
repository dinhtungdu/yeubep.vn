'use strict';
var Collect = require('../models/collect');
var Hotpot = require('../models/hotpot');
var User = require('../models/user');
var helpers = require('../helpers');
var async = require('async');
var GFS = require('../models/gfs');

module.exports = function (app, passport) {
	app.post('/api/collections',
		helpers.isLoggedIn,
		function(req, res, next) {
			var collection = new Collect({
				userId: req.user._id,
				title: req.body.collectionTitle,
				description: req.body.collectionDesc
			});
			collection.save(function(err, collection) {
				if(err) return next(err);
				res.send(collection.collectionId);
			});
		}
	);

	app.get('/api/collections/:collectionId',
		function(req, res, next) {
			Collect.findOne({collectionId: req.params.collectionId})
				.populate({
					path: 'userId',
					select: 'username name facebook.id'
				})
				.populate({
					path: 'recipes.recipeId',
					model: 'Hotpot'
				})
				.populate({
					path: 'comments',
					options: { sort: { 'createdAt': -1 } },
					populate: {
						path: 'userId',
						model: 'User',
						select: 'facebook.id username name'
					}
				})
				.exec( function(err, collection) {
					if(err) return next(err);
					if(!collection) {
						return res.status(404).send({ message: 'Collection not found.'});
					}
					res.send(collection);
				});
		}
	);

	app.put('/api/collections/:id',
		helpers.isLoggedIn,
		function(req, res, next) {
			Collect.findById(req.params.id, function(err, collection) {
				if(err) { res.send(err); }
				if(collection.userId !== req.user._id) {
					res.send('Cheating, uh?');
				}
				collection.title = req.body.collectionTitle;
				collection.description = req.body.collectionDesc;

				collection.save(function(err) {
					if(err) { res.send(err); }
					res.send('Collection updated!');
				});
			});
		}
	);

	app.delete('/api/collections/:id',
		helpers.isLoggedIn,
		function(req, res, next) {
			Collect.findOne({
					_id: req.params.id,
					userId: req.user._id
				})
				.remove()
				.exec();
			res.send('Collection deleted!');
		}
	);

	app.post('/api/collections/add/:collectionId',
		helpers.isLoggedIn,
		function(req, res, next) {
			async.waterfall([
				function(cb) {
					Hotpot.findById(req.body.recipeId, function(err, hotpot) {
						if( ! helpers.findObjectInArray(hotpot.recipe.collections, 'collectionId', req.params.collectionId)) {
							hotpot.recipe.collections.push({collectionId: req.params.collectionId});
							hotpot.save(function(err) {
								if(err) {
									return res.send(err);
								}
								cb(null)
							});
						} else {
							return res.send('Công thức này đã được thêm trước đó rồi.')
						}
					});
				},
				function() {
					Collect.findOne({
						_id: req.params.collectionId,
						userId: req.user._id
					}, function(err, collection) {
						collection.recipes.push({recipeId: req.body.recipeId});
						collection.save(function(err) {
							if(err) {
								return res.send(err);
							}
							res.send('Add recipe to collection successfully!');
						});
					});
				}
			]);
		}
	);

	app.delete('/api/collections/:id/remove/:recipe_id',
		helpers.isLoggedIn,
		function(req, res, next) {
			Collect.findOne({
				_id: req.params.id,
				userId: req.user._id
			}, function(err, collection) {
				helpers.removeFromArray(collection.recipes, req.body.recipeId);
				collection.save(function(err) {
					if(err) { res.send(err); }
					res.send('Delete recipe from collection successfully!');
				});
			});
		}
	);

	app.get('/api/usercollections/:userId',
		function(req, res, next) {
			Collect.find({
				userId: req.params.userId
			})
			.populate({
				path: 'recipes.recipeId',
				model: 'Hotpot',
				select: 'mainPhoto',
				populate: {
					path: 'mainPhoto',
					model: 'GFS',
					select: 'metadata.thumbs.s320.id'
				},
				options: { sort: { 'addedAt': -1 }, limit: 4 }
			})
			.exec( function(err, collections) {
				if(err) return next(err);

				if(!collections) {
					return res.status(404).send(null);
				}

				res.send(collections);
			});
		}
	);
}

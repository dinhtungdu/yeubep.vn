'use strict';
var Hotpot = require('../models/hotpot');
var helpers = require('../helpers');
var async = require('async');

module.exports = function (app, passport) {
	app.post('/api/collections',
		helpers.isLoggedIn,
		function(req, res, next) {
			var hotpot = new Hotpot({
				userId: req.user._id,
				type: 'collection',
				recipeCollection: {
					title: req.body.collectionTitle,
					description: req.body.collectionDesc
				}
			});
			hotpot.save(function(err, hotpot) {
				if(err) return next(err);
				console.log('Collection ' + hotpot._id + ' was added successfully!');
				res.send('success');
			});
		}
	);

	app.get('/api/collections/:id',
		function(req, res, next) {
			Hotpot.findById(req.params.id, function(err, hotpot) {
				if(err) return next(err);
				if(!hotpot) {
					return res.status(404).send({ message: 'Collection not found.'});
				}
				res.send(hotpot);
			});
		}
	);

	app.put('/api/collections/:id',
		helpers.isLoggedIn,
		function(req, res, next) {
			Hotpot.findById(req.params.id, function(err, hotpot) {
				if(err) { res.send(err); }
				if(hotpot.userId !== req.user._id) {
					res.send('Cheating, uh?');
				}
				hotpot.recipeCollection.title = req.body.collectionTitle;
				hotpot.recipeCollection.description = req.body.collectionDesc;

				hotpot.save(function(err) {
					if(err) { res.send(err); }
					res.send('Collection updated!');
				});
			});
		}
	);

	app.delete('/api/collections/:id',
		helpers.isLoggedIn,
		function(req, res, next) {
			Hotpot.findOne({
					_id: req.params.id,
					userId: req.user._id
				})
				.remove()
				.exec();
			res.send('Collection deleted!');
		}
	);

	app.post('/api/collections/:id/add',
		helpers.isLoggedIn,
		function(req, res, next) {
			Hotpot.findOne({
				_id: req.params.id,
				userId: req.user._id
			}, function(err, hotpot) {
				hotpot.recipeCollection.recipes.push(req.body.recipeId);
				hotpot.save(function(err) {
					if(err) { res.send(err); }
					res.send('Add recipe to collection successfully!');
				});
			});
		}
	);

	app.delete('/api/collections/:id/remove/:recipe_id',
		helpers.isLoggedIn,
		function(req, res, next) {
			Hotpot.findOne({
				_id: req.params.id,
				userId: req.user._id
			}, function(err, hotpot) {
				helpers.removeFromArray(hotpot.recipeCollection.recipes, req.body.recipeId);
				hotpot.save(function(err) {
					if(err) { res.send(err); }
					res.send('Delete recipe from collection successfully!');
				});
			});
		}
	);
}

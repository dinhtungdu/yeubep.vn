'use strict';
var Hotpot = require('../models/hotpot');
var User = require('../models/user');
var helpers = require('../helpers');
var upload = require('../controllers/upload');
var async = require('async');
//var Busboy = require('busboy');
//var validator = require('validator');

module.exports = function(app, passport) {
	app.post('/api/recipes',
		helpers.isLoggedIn,
		function(req, res, next) {
			async.waterfall([
				function(cb) {
					var recipeInfo = {
						userId: req.user._id,
						visible : req.body.visible,
						recipe : {
							prepTime: req.body.prepTime,
							cookTime: req.body.cookTime,
							title: req.body.title,
							numberOfServings: req.body.numberOfServings,
							description: req.body.description,
							directions: req.body.directions,
							note: req.body.note,
							ingredients: req.body.ingredients,
							category: req.body.category
						},
						mainPhoto: req.body.mainPhoto
					};
					cb(null, recipeInfo);
				},
				function(recipeInfo, cb) {
					console.log(recipeInfo);
					recipeInfo.recipe.title = recipeInfo.recipe.title.trim().replace(/<(?:.|\n)*?>/gm, '');
					recipeInfo.recipe.directions = recipeInfo.recipe.directions.trim().replace(/<(?:.|\n)*?>/gm, '');
					recipeInfo.recipe.ingredients = recipeInfo.recipe.ingredients.trim().replace(/<(?:.|\n)*?>/gm, '');
					recipeInfo.recipe.description = recipeInfo.recipe.description.trim().replace(/<(?:.|\n)*?>/gm, '');
					recipeInfo.recipe.note = recipeInfo.recipe.note.trim().replace(/<(?:.|\n)*?>/gm, '');
					if( recipeInfo.mainPhoto == '' ) {
						recipeInfo.mainPhoto = null;
					}
					cb(null, recipeInfo);
				},
				function(recipeInfo) {
					var hotpot = new Hotpot({
						userId: recipeInfo.userId,
						type: 'recipe',
						visible: recipeInfo.visible,
						recipe: recipeInfo.recipe,
						mainPhoto: recipeInfo.mainPhoto
					});
					hotpot.save(function(err, hotpot) {
						if(err) return next(err);
						console.log('Recipe ' + hotpot.id + ' was added successfully!');
						res.send({
							status: 'success',
							contentId: hotpot.contentId
						});
					});
				}
			]);
	});

	app.get('/api/recipes/:id',
		function(req, res, next) {
			Hotpot.findOne({contentId: req.params.id})
				.populate('mainPhoto userId')
				.populate({
					path: 'comments',
					options: {
						createdAt: -1
					}
				})
				.exec( function(err, hotpot) {
					if(err) return next(err);

					if(!hotpot) {
						return res.status(404).send('Recipe not found');
					}

					if(hotpot.visible != 'public' && helpers.isLoggedIn(req, res, next) && req.user._id != hotpot.userId ) {
						return res.status(401).send({ message: 'Private recipe.'});
					}

					res.send(hotpot);
				});
		}
	);

	app.delete('/api/recipes/:id',
		helpers.isLoggedIn,
		function(req, res, next) {
			Hotpot.findOne({
				_id: req.params.id,
				userId: req.user._id
			})
			.remove()
			.exec();
		}
	);

	app.put('/api/recipes/:id',
		//helpers.isLoggedIn,
		function(req, res, next) {
			Hotpot.findById(req.params.id, function(err, hotpot) {
				if(err) {
					return next(err)
				}
				if( hotpot.userId != req.user._id ) {
					return res.status(401).send({ message: 'Cheating, uh?'});
				}
				async.waterfall([
					function(cb) {
						console.log('before hotpot', hotpot);
						console.log('body', req.body);
						hotpot.visible  = req.body.visible;
						hotpot.recipe.prepTime = req.body.prepTime;
						hotpot.recipe.cookTime = req.body.cookTime;
						hotpot.recipe.title = req.body.title;
						hotpot.recipe.numberOfServings = req.body.numberOfServings;
						hotpot.recipe.description = req.body.description;
						hotpot.recipe.directions = req.body.directions;
						hotpot.recipe.ingredients = req.body.ingredients;
						hotpot.recipe.note = req.body.note;
						hotpot.mainPhoto = req.body.mainPhoto;
						cb(null, hotpot);
					},
					function(hotpot) {
						hotpot.save(function(err) {
							if(err) {
								return next(err);
							}
							res.status(200).send({message: 'Recipe Updated!', id: hotpot.contentId});
						});
					}
				]);
			});
		}
	);

	// Get user's recipes
	app.get('/api/:userid/recipes',
		function(req, res, next) {
			User.findOne({
				username: req.params.userid
			}, function(err, user) {
				if(err) return next(err);
				var userid = user._id;
				Hotpot.find({
						userId: userid,
						type: 'recipe',
						visible: 'public'
					})
					.populate( 'userId mainPhoto' )
					.exec( function(err, hotpots) {
						if(err) return next(err);

						if(!hotpots) {
							return res.status(404).send({ message: 'Đầu bếp này chưa có công thức nào.'});
						}

						res.send(hotpots);
					});
			});
		}
	);

	// Get all user's recipe. Use when user view his profile
	app.get('/api/:userid/allrecipes',
		helpers.isLoggedIn,
		function(req, res, next) {
			async.waterfall([
				function(cb) {
					User.findOne({
						username: req.params.userid
					}, function(err, user) {
						if(err) return next(err);
						var userid = user._id;
						console.log(userid);
						cb(null, userid);
					});
				},
				function( userid ) {
					Hotpot.find({
						userId: userid,
						type: 'recipe',
					})
					.populate( 'mainPhoto userId' )
					.exec( function(err, hotpots) {
						if(err) return next(err);

						if(!hotpots) {
							return res.status(404).send({ message: 'Bạn chưa có công thức nào.'});
						}

						res.send(hotpots);
					});
				}
			]);
		}
	);
};
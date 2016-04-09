'use strict';
var Hotpot = require('../models/hotpot');
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
							id: hotpot.id
						});
					});
				}
			]);
	});

	app.get('/api/recipes/:id',
		function(req, res, next) {
			Hotpot.findById(req.params.id, function(err, hotpot) {
				if(err) return next(err);

				if(!hotpot) {
					return res.status(404).send({ message: 'Recipe not found.'});
				}

				if(hotpot.visible != 'public' && helpers.isLoggedIn(req, res, next) && req.user._id != hotpot.userId ) {
					return res.staus(401).send({ message: 'Private recipe.'});
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
		helpers.isLoggedIn,
		function(req, res, next) {
			Hotpot.findById(req.params.id, function(err, hotpot) {
				if(err) {
					res.send(err);
				}
				if( hotpot.userId !== req.user._id ) {
					res.send('Cheating, uh?');
				}
				async.waterfall([
					function(cb) {
						var busboy = new Busboy({ headers: req.headers });
						var recipeVar = {};
						busboy.on('field', function(fieldname, val) {
							recipeVar[fieldname] = val;
						});
						req.pipe(busboy);
						cb(null, recipeVar);
					},
					function(recipeVar, cb) {
						hotpot.visible  = recipeVar.visible;
						hotpot.recipe.prepTime = recipeVar.prepTime;
						hotpot.recipe.cookTime = recipeVar.cookTime;
						hotpot.recipe.title = recipeVar.title;
						hotpot.recipe.numberOfServings = recipeVar.numberOfServings;
						hotpot.recipe.preparation = recipeVar.preparation;
						hotpot.recipe.description = recipeVar.description;
						hotpot.recipe.directions = recipeVar.directions;
						hotpot.recipe.ingredients = recipeVar.ingredients;
						hotpot.recipe.note = recipeVar.note;
						cb(null, hotpot);
					},
					function(hotpot) {
						hotpot.save(function(err) {
							if(err) {
								res.send(err);
							}
							res.send('Recipe updated!');
						});
					}
				]);
			});
		}
	);

	app.put('/api/recipes/:id/photo',
		helpers.isLoggedIn,
		function(req, res, next) {
			Hotpot.findById(req.params.id, function(err, hotpot) {
				if(err) {
					res.send(err);
				}
				if( hotpot.userId != req.user._id ) {
					res.send('Cheating, uh?');
				}
				async.waterfall([
					function(cb) {
						upload.create(req, res, function(photoId) {
							cb(null, photoId);
						});
					},
					function(photoId) {
						hotpot.mainPhoto = photoId;
						hotpot.save(function(err) {
							if(err) {
								res.send(err);
							}
							res.send('Main photo of recipe updated!');
						});
					}
				]);
			});
		}
	);

};
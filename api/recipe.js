var Hotpot = require('../models/hotpot.js');
var helpers = require('../helpers.js');
var upload = require('../controllers/upload');
var download = require('../controllers/download');
module.exports = function(app) {
	'use strict';

	app.post('/api/recipes',
		upload.create );
		//helpers.isLoggedIn
		//function(req, res, next) {
		//	var userId = req.body.userId;
		//	var type = 'recipe';
		//	var visible = req.body.visible;
		//	var loveCount = 0;
		//	var recipe = {
		//		prepTime: req.body.prepTime,
		//		cookTime: req.body.cookTime,
		//		title: req.body.title,
		//		numberOfServings: req.body.numberOfServings,
		//		description: req.body.description,
		//		directions: req.body.directions,
		//		ingredients: req.body.ingredients
		//	};
		//	var mainPhoto = req.body.mainPhoto;
	//});
	app.get('/api/recipes/:id', function(req, res) {
		upload.createFromUrl('http://vietmoz.com/logo-small.png');
		res.send('success');
	});
};
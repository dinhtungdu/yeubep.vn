var Category = require('../models/category');
var Hotpot = require('../models/hotpot');
var helpers = require('../helpers.js');
module.exports = function(app) {
	'use strict';
	app.get('/api/categories', function(req, res, next) {
		Category.find({}, function(err, categories) {
			if( err ) return next(err);
			var categoryMap = {};

			categories.forEach(function(category) {
				categoryMap[category._id] = category.name;
			});

			res.send(categoryMap);
		});
	});
	app.get('/api/categories/:id', function(req, res, next) {
		Category.findById(req.params.id, function(err, category) {
			if( err ) return next(err);
			res.send(category);
		});
	});
};
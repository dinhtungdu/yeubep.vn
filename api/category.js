var Category = require('../models/category');
var helpers = require('../helpers.js');
module.exports = function(app) {
	'use strict';
	app.get('/api/categories/', function(req, res, next) {
		Category.find({}, function(err, categories) {
			if( err ) return next(err);
			var categoryMap = {};

			categories.forEach(function(category) {
				categoryMap[category._id] = category.name;
			});

			res.send(categoryMap);
		});
	});
};
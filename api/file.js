var upload = require('../controllers/upload');
var helpers = require('../helpers.js');
module.exports = function(app, passport) {
	'use strict';

	app.get(
		'/file/:id',
		upload.read
	);
};
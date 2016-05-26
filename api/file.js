var upload = require('../controllers/upload');
var helpers = require('../helpers.js');
module.exports = function(app, passport) {
	'use strict';

	app.get(
		'/file/:id',
		upload.read
	);

	app.post('/file/add',
		helpers.isLoggedIn,
		upload.create
	);

	app.delete('/file/:id',
		helpers.isLoggedIn,
		upload.delete
	);
};
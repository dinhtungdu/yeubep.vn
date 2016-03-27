'use strict';
var Hotpot = require('../models/hotpot');
var helpers = require('../helpers');
var async = require('async');
//var Busboy = require('busboy');

module.exports = function(app, passport) {
	app.post('/api/love/:id',
		helpers.isLoggedIn,
		function (req, res, next) {
			Hotpot.findById( req.params.id, function (err, hotpot) {
				if(err) { res.send(err) }
				if( helpers.ArrContains.call(hotpot.loves, req.user._id)) {
					res.send('Already liked!');
				}
				hotpot.loves.push(req.user._id);
				hotpot.save(function (err) {
					if(err) { res.send(err) }
					res.send('Love success!');
				});
			});
		}
	);

	app.delete('/api/love/:id',
		helpers.isLoggedIn,
		function (req, res) {
			Hotpot.findById( req.params.id, function(err, hotpot) {
				if(err) { res.send(err) }
				helpers.removeFromArray(hotpot.loves, req.user._id);
				hotpot.save(function (err) {
					if(err) { res.send(err) }
					res.send('Done!');
				});
			});
		}
	);
}

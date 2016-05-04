'use strict';
var Hotpot = require('../models/hotpot');
var helpers = require('../helpers');
var _ = require('underscore');

module.exports = function(app, passport) {
	app.put('/api/love/:id',
		helpers.isLoggedIn,
		function (req, res, next) {
			Hotpot.findById( req.params.id, function (err, hotpot) {
				if(err) { res.send(err) }
				console.log(_.indexOf(hotpot.loves, req.user._id.toString(), true));
				if( _.indexOf(hotpot.loves, req.user._id.toString()) >= 0 ) {
					hotpot.loves = _.without(hotpot.loves, req.user._id.toString());
					hotpot.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('dislike');
					});
				} else {
					hotpot.loves.push(req.user._id);
					hotpot.save(function (err) {
						if(err) { res.send(err) }
						res.status(200).send('like');
					});
				}
			});
		}
	);
}

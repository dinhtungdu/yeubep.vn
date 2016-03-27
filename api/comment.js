'use strict';
var mongoose = require('mongoose');
var Comment = require('../models/comment');
var Hotpot = require('../models/hotpot');
var helpers = require('../helpers');
var async = require('async');

module.exports = function(app, passport) {
	app.post('/api/comments',
		helpers.isLoggedIn,
		function (req, res, next) {
			async.waterfall([
				function(cb) {
					var commentId = new mongoose.Types.ObjectId();
					var comment = new Comment({
						_id: commentId,
						body: req.body.commentBody,
						hotpotId: req.body.postId,
						userId: req.user._id
					});
					cb(null, commentId);
				},
				function (commentId) {
					Hotpot.findById(req.body.postId, function(err, hotpot) {
						if(err) { res.send(err) }
						if( helpers.ArrContains.call(hotpot.comments, commentId)) {
							res.send('WTF?');
						}
						hotpot.comments.push(commentId);
						hotpot.save(function(err) {
							if(err) {res.send(err)}
							res.send('Comment successfully');
						});
					});
				}
			]);
		}
	);

	app.get('/api/comments/:id',
		function (req, res, next) {
			Comment.findById(req.params.id, function(err, comment) {
				if(err) return next(err);
				if(!hotpot) {
					return res.sendStatus(404).send({message: 'Comment not found.'});
				}
				// Check for comment of private post
				// later

				res.send(comment);
			});
		}
	);

	app.put('/api/comments/:id',
		helpers.isLoggedIn,
		function(req, res, next) {
			Comment.findById(req.params.id, function(err, comment) {
				if(err) { res.send(err); }
				if(comment.userId !== req.user._id) {
					res.send('Cheating, uh?');
				}
				comment.body = req.body.commentBody;
				comment.save(function(err) {
					if(err) { res.send(err); }
					res.send('Comment updated!');
				});
			});
		}
	);

	app.delete('/api/comments/:id',
		helpers.isLoggedIn,
		function(req, res, next) {
			async.waterfall([
				function(cb) {
					Comment.findOne({
							_id: req.params.id,
							userId: req.user._id
						},
						function(err, comment) {
							if(err) return next(err);
							var hotpotId = comment.hotpotId;
							cb(null, hotpotId);
						})
						.remove()
						.exec();
					res.send('Comment deleted!');
				},
				function(hotpotId) {
					Hotpot.findById(req.body.hotpotId, function(err, hotpot) {
						helpers.removeFromArray(hotpot.comments, req.params.id);
					});
				}
			]);
			res.send('Comment Deleted');
		}
	);
}

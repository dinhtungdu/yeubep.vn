'use strict';
var request = require('request');
var mongoose = require('mongoose'),
	_ = require('lodash');
var gm = require('gm'), imageMagick = gm.subClass({ imageMagick: true });;
var async = require('async');
var Grid = require('gridfs-stream');
var Busboy = require('busboy');
var configDB = require('../config/db');
//var im = require('imagemagick-stream');

if( mongoose.connection.readyState = 0) {
	mongoose.connect(configDB.database);
}
Grid.mongo = mongoose.mongo;
var gfs = new Grid(mongoose.connection.db);

exports.create = function( req, res, cb ) {
	var busboy = new Busboy({
		headers : req.headers,
		limits: {
			files: 1
		}
	});
	var fileId = '';
	var thumbId = '';
	var squareThumbId = '';
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		console.log('got file', filename, mimetype, encoding);
		fileId = new mongoose.Types.ObjectId();
		thumbId = new mongoose.Types.ObjectId();
		squareThumbId = new mongoose.Types.ObjectId();
		imageMagick(file)
			.size({bufferStream: true}, function(err, size) {
				var thumbWidth = 320;
				var thumbHeight = (thumbWidth * size.height) / size.width;
				var writeStream = gfs.createWriteStream({
					_id: fileId,
					filename: filename,
					mode: 'w',
					content_type: mimetype,
					metadata: {
						userId: req.user._id,
						height: size.height,
						width: size.width,
						thumbs: {
							w320: {
								id: thumbId.toString(),
								width: thumbWidth,
								height: thumbHeight
							},
							s320: {
								id: squareThumbId.toString(),
								width: 320,
								height: 320
							}
						}
					}
				});
				this.stream(function (err, stdout, stderr) {
					stdout.pipe(writeStream);
				});

				var thumbWriteStream = gfs.createWriteStream({
					_id: thumbId,
					filename: 'thumb_320_' + filename,
					mode: 'w',
					content_type: mimetype,
					metadata: {
						userId: req.user._id,
						original: fileId.toString(),
						width: thumbWidth,
						height: thumbHeight
					}
				});
				var squareThumbWriteStream = gfs.createWriteStream({
					_id: squareThumbId,
					filename: 'thumb_320x320_' + filename,
					mode: 'w',
					content_type: mimetype,
					metadata: {
						userId: req.user._id,
						original: fileId.toString(),
						width: 320,
						height: 320
					}
				});
				this.resize(320)
					.quality(80)
					.stream(function (err, stdout, stderr) {
						stdout.pipe(thumbWriteStream);
					});
				this.resize(320, 320, '^')
					.gravity('Center')
					.crop('320', '320')
					.quality(80)
					.stream(function (err, stdout, stderr) {
						stdout.pipe(squareThumbWriteStream);
					});
			});

	}).on('finish', function() {
		// show a link to the uploaded file
		//res.writeHead(200, {'content-type': 'text/html'});
		res.send(fileId.toString());
		cb(fileId.toString());
	});

	req.pipe(busboy);
	return fileId.toString();
};

exports.createFromUrl = function (url, userId) {
	var fileId = new mongoose.Types.ObjectId();
	var fileName = url.split('/').pop();
	fileName = fileName.split('?').shift();

	var writestream = gfs.createWriteStream({
		_id: fileId,
		userId: userId,
		filename: fileName,
		mode: 'w',
		metadata: {
			userId: req.user._id,
		}
	});
	request
		.get(url)
		.pipe(writestream);

	writestream.on('close', function (file) {
		console.log(file.filename + ' Written To DB');
	});
	return fileId.toString();
};


exports.read = function( req, res ) {
	gfs.findOne({ _id: req.params.id }, function (err, file) {
		if (err) return res.status(400).send(err);
		if (!file) return res.status(404).send('');

		res.set('Content-Type', file.contentType);
		res.set('Content-Disposition', 'attachment; filename="' + file.filename + '"');

		var readstream = gfs.createReadStream({
			_id: file._id
		});

		readstream.on("error", function(err) {
			console.log("Got error while processing stream " + err.message);
			res.end();
		});

		readstream.pipe(res);
	});
};

exports.delete = function( req, res ) {
	async.waterfall([
		function(cb) {
			gfs.findOne({ _id: req.params.id }, function (err, file) {
				if (err) return res.status(400).send(err);
				cb(null, file.metadata.thumbs.w320.id, file.metadata.thumbs.s320.id);
			});
		}, function(w320, s320) {
			gfs.remove({
				_id: req.params.id,
				'metadata.userId': req.user._id
			}, function(err) {
				if(err) { return next(err);}
				console.log('Deleted file with ID ', req.params.id);
			});
			gfs.remove({
				_id: w320,
				'metadata.userId': req.user._id
			}, function(err) {
				if(err) { return next(err);}
				console.log('Deleted file with ID ', w320);
			});
			gfs.remove({
				_id: s320,
				'metadata.userId': req.user._id
			}, function(err) {
				if(err) { return next(err);}
				res.end();
				console.log('Deleted file with ID ', s320);
			});
		}
	]);
}
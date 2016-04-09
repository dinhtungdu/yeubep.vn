'use strict';
var request = require('request');
var mongoose = require('mongoose'),
	_ = require('lodash');
var Grid = require('gridfs-stream');
var Busboy = require('busboy');
var configDB = require('../config/db');

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
	busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		console.log('got file', filename, mimetype, encoding);
		fileId = new mongoose.Types.ObjectId();
		var writeStream = gfs.createWriteStream({
			_id: fileId,
			filename: filename,
			mode: 'w',
			content_type: mimetype,
			metadata: {
				userId: req.user._id,
			}
		});
		file.pipe(writeStream);
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
		mode: 'w'
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
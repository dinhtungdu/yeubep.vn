'use strict';

var fs = require('fs'),
	request = require('request'),
	path = require('path');


module.exports = function(url, filepath) {
	request(url).pipe(fs.createWriteStream(filepath));
};

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gfsSchema = mongoose.Schema({}, {
	collection: 'fs.files'
});

module.exports = mongoose.model('GFS', gfsSchema);
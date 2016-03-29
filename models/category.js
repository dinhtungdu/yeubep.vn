var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
	name: String,
	description: String,
	photo: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
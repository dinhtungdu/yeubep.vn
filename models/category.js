var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = mongoose.Schema({
	name: String,
	ctype: {
		type: String,
		enum: [ 'main', 'occasion', 'ingredient' ],
		default: 'main'
	},
	description: String,
	photo: String
}, {
	timestamps: true,
	collection: 'categories'
});

module.exports = mongoose.model('Category', categorySchema);
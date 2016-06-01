var mongoose = require('mongoose');
var shortid = require('shortid');

var userSchema = mongoose.Schema({
	username: {
		type: String,
		default: shortid.generate,
		index: true
	},
	name: String,
	email: String,
	provider: {
		type: String,
		enum: [ 'facebook', 'google' ]
	},
	facebook: {}
}, {
	timestamps: true
});

module.exports = mongoose.model('User', userSchema);
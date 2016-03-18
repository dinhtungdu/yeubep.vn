var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	username: String,
	name: String,
	email: String,
	avatarId: String,
	provider: String,
	facebook: {}
});

module.exports = mongoose.model('User', userSchema);
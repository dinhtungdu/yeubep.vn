var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = mongoose.Schema({
	body: String,
	rating: Number,
	hotpotId: { type: String },
	loves: [{ type: String, ref: 'User'}],
	userId: { type: String, ref: 'User' }
}, {
	timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
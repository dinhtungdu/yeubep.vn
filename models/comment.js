var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
	body: String,
	parentId: String,
	hotpotId: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
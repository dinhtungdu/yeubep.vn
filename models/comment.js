var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = mongoose.Schema({
	body: String,
	hotpotId: { type: Schema.Types.ObjectId, ref: 'Hotpot' },
	userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
	timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
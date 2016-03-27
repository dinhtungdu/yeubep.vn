var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var activitySchema = Schema({
	userId: {type: Schema.Types.ObjectId, ref: 'User'},
	isHidden: Boolean,
	fanOut: String,
	hotpotId: { type: Schema.Types.ObjectId, ref: 'Hotpot' },
	dest: String, //newFeeds or noti
	type: String,
	commentId: { type: Schema.Types.ObjectId, ref: 'Comment' }
}, {
	timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);
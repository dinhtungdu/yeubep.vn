var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var notificationSchema = Schema({
	createdAt: { type: Date, expires: '30d' },
	userId: {type: Schema.Types.ObjectId, ref: 'User' },
	activityId: { type: Schema.Types.ObjectId, ref: 'Activity' },
	relevancy: Date
});

module.exports = mongoose.model('Notification', notificationSchema);
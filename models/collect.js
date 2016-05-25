var GFS = require('./gfs');
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var shortid = require('shortid');

var collectionSchema = mongoose.Schema({
	collectionId: {
		type: String,
		default: shortid.generate,
		index: true
	},
	userId: { type: String, ref: 'User'},
	visible: {
		type: String,
		enum: [ 'public', 'private' ],
		default: 'public'
	},
	title: String,
	description: String,
	recipes: [{
		recipeId: { type: String, ref: 'Hotpot'},
		addedAt: {
			type: Date,
			default: Date.now
		}
	}],
	loves: [{ type: String, ref: 'User'}],
	followers: [{ type: String, ref: 'User'}],
	comments: [{ type: String, ref: 'Comment'}]
}, {
	timestamps: true
});
module.exports = mongoose.model('Collect', collectionSchema);

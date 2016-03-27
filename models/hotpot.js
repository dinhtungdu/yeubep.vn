var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var hotpotSchema = mongoose.Schema({
	userId: String,
	type: String,
	visible: String,
	loves: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
	recipe: {
		category: String,
		prepTime: Number,
		cookTime: Number,
		title: String,
		numberOfServings: Number,
		description: String,
		directions: String,
		ingredients: String
	},
	mainPhoto: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Hotpot', hotpotSchema);

var mongoose = require('mongoose');

var hotpotSchema = mongoose.Schema({
	userId: String,
	type: String,
	visible: String,
	timeCreated: { type: Date, default: Date.now },
	timeUpdated: Date,
	loveCount: Number,
	recipe: {
		prepTime: Number,
		cookTime: Number,
		title: String,
		numberOfServings: Number,
		description: String,
		directions: String,
		ingredients: String
	}
});

module.exports = mongoose.model('Hotpot', hotpotSchema);

var mongoose = require('mongoose');

var hotpotSchema = mongoose.Schema({
	userId: String,
	type: String,
	visible: String,
	love: [],
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

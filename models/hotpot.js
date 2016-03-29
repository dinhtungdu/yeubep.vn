var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var hotpotSchema = mongoose.Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User'},
	type: String,
	visible: String,
	loves: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
	recipe: {
		category: { type: Schema.Types.ObjectId, ref: 'Category'},
		prepTime: Number,
		cookTime: Number,
		title: String,
		numberOfServings: Number,
		description: String,
		directions: String,
		ingredients: String
	},
	recipeCollection: {
		title: String,
		description: String,
		recipes: [{ type: Schema.Types.ObjectId, ref: 'Hotpot'}]
	},
	mainPhoto: String
}, {
	timestamps: true
});

module.exports = mongoose.model('Hotpot', hotpotSchema);

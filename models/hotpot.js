var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var shortid = require('shortid');

var hotpotSchema = mongoose.Schema({
	contentId: {
		type: String,
		default: shortid.generate,
		index: true
	},
	userId: { type: Schema.Types.ObjectId, ref: 'User'},
	type: {
		type: String,
		enum: [ 'recipe', 'photo', 'recipeCollection', 'note' ],
		default: 'recipe'
	},
	visible: {
		type: String,
		enum: [ 'public', 'private' ],
		default: 'public'
	},
	loves: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
	recipe: {
		category: { type: Schema.Types.ObjectId, ref: 'Category'},
		occasion: {
			type: [{ type: String }],
			validate: [arrayLimit, 'Exceeds the limit of 3']
		},
		prepTime: Number,
		cookTime: Number,
		title: String,
		numberOfServings: Number,
		description: String,
		directions: String,
		preparation: String,
		note: String,
		ingredients: String,
		ingredientsTags: [ {type: String} ]
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

function arrayLimit(val) {
	return val.length <= 3;
}
module.exports = mongoose.model('Hotpot', hotpotSchema);

var User = require('./user');
var Comment = require('./comment');
var GFS = require('./gfs');
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
var shortid = require('shortid');

var hotpotSchema = mongoose.Schema({
	contentId: {
		type: String,
		default: shortid.generate,
		index: true
	},
	userId: { type: String, ref: 'User'},
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
	loves: [{ type: String, ref: 'User'}],
	comments: [{ type: String, ref: 'Comment'}],
	recipe: {
		category: { type: String, ref: 'Category'},
		occasion: {
			type: [{ type: String }],
			validate: [arrayLimit, 'Exceeds the limit of 3']
		},
		prepTime: {
			type: Number,
			default: ''
		},
		cookTime: {
			type: Number,
			default: ''
		},
		title: {
			type: String,
			default: 'Công thức chưa có tiêu đề'
		},
		numberOfServings: {
			type: Number,
			default: ''
		},
		description: {
			type: String,
			default: ''
		},
		directions: {
			type: String,
			default: ''
		},
		note: {
			type: String,
			default: ''
		},
		ingredients: {
			type: String,
			default: ''
		},
		ingredientsTags: [ {type: String} ]
	},
	recipeCollection: {
		title: String,
		description: String,
		recipes: [{ type: String, ref: 'Hotpot'}]
	},
	mainPhoto: { type: String, ref: 'GFS', default: null }
}, {
	timestamps: true
});

function arrayLimit(val) {
	return val.length <= 3;
}
module.exports = mongoose.model('Hotpot', hotpotSchema);

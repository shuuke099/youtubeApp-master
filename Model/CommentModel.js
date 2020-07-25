const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
	comment: {
		type: String,
		required: ['you must write a comment'],
	},
	userId: {
		type: mongoose.Schema.ObjectId,
		required: ['comment must belong to user'],
		ref: 'User',
	},
	videoId: {
		type: mongoose.Schema.ObjectId,
		required: ['comment must belong to video'],
		ref: 'Video',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

commentSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'userId',
		select: 'name photo',
	});

	next();
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;

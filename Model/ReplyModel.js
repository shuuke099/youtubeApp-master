const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
	reply: {
		type: String,
		required: ['you must write a comment'],
	},
	userId: {
		type: mongoose.Schema.ObjectId,
		required: ['comment must belong to user'],
		ref: 'User',
	},
	commentId: {
		type: mongoose.Schema.ObjectId,
		required: ['comment must belong to video'],
		ref: 'Comment',
	},
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;

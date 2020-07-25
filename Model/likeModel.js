const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
	},
	videoId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Video',
	},
	commentId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Comment',
	},
});

const Likes = mongoose.model('Likes', likesSchema);

module.exports = Likes;

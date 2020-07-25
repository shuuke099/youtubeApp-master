const mongoose = require('mongoose');

const dislikesSchema = new mongoose.Schema({
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

const DisLikes = mongoose.model('DisLikes', dislikesSchema);

module.exports = DisLikes;

const mongoose = require('mongoose');
const Video = require('./videoModel');
const viewSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: [true, 'view must belong to userId'],
	},
	videoId: {
		type: mongoose.Schema.ObjectId,
		ref: 'Video',
		required: [true, 'view must belong to videoId'],
	},
});
viewSchema.index({userId: 1, videoId: 1}, {unique: true});

viewSchema.statics.calcNumOfViews = async function (videoId) {
	const stats = await this.aggregate([
		{
			$match: {videoId},
		},
		{
			$group: {
				_id: '$videoId',
				nViews: {$sum: 1},
			},
		},
	]);

	if (stats.length > 0) {
		await Video.findByIdAndUpdate(videoId, {
			views: stats[0].nViews,
		});
	} else {
		await User.findByIdAndUpdate(videoId, {
			views: 0,
		});
	}
};

viewSchema.post('save', function () {
	// this points to current review
	this.constructor.calcNumOfViews(this.videoId);
});
const Views = mongoose.model('View', viewSchema);

module.exports = Views;

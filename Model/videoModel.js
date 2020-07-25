const mongoose = require('mongoose');
const slugify = require('slugify');

const videoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, 'video must have a name'],
		},
		description: String,
		videoPath: {
			type: String,
			required: [true, 'video must have a path'],
		},
		audiance: {
			type: Boolean,
			default: true,
		},
		slug: String,
		privacy: {
			type: Number,
			enum: [0, 1, 2],
		},
		creator: {
			type: mongoose.Schema.ObjectId,
			required: [true, 'video must belong to user'],
			ref: 'User',
		},
		thumbnail: {
			type: String,
			required: [true, 'video must have athumb'],
		},
		likes: {
			type: Number,
			default: 0,
		},
		disLike: {
			type: Number,
			default: 0,
		},
		views: {
			type: Number,
			default: 0,
		},
		category: String,
		comment: {
			type: Boolean,
			default: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		duration: String,
	},
	{
		toJSON: {virtuals: true},
		toObject: {virtuals: true},
	}
);

videoSchema.pre('save', function (next) {
	this.slug = slugify(this.title, {lower: true});
	next();
});

videoSchema.pre(/^find/, function (next) {
	this.populate({
		path: 'creator',
		select: '-__v -passwordChangedAt',
	});

	next();
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;

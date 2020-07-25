const Views = require('../Model/viewModel');
const catchAsync = require('../Utilits/catchAsync');

exports.getCurrentViews = catchAsync(async (req, res, next) => {
	const doc = await Views.find({videoId: req.body.videoId});
	res.status(200).json({
		success: true,
		doc,
	});
});
exports.createView = catchAsync(async (req, res, next) => {
	const review = await Views.findOne(req.body);

	if (review) {
		const doc = await Views.find({videoId: req.body.videoId});
		return res.status(200).json({
			status: 'success',
			doc,
		});
	}
	await Views.create(req.body);
	const doc = await Views.find({videoId: req.body.videoId});
	res.status(201).json({
		status: 'success',
		data: {
			doc,
		},
	});
});

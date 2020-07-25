const catchAsync = require('../Utilits/catchAsync');
const AppError = require('../Utilits/AppError');
const APIFeatures = require('../Utilits/apiFeatures');
const Video = require('../Model/videoModel');
// create reaction

exports.reactUp = (Modelone, Modeltwo) =>
	catchAsync(async (req, res, next) => {
		let Options = {};
		if (req.body.videoId) {
			Options = {videoId: req.body.videoId, userId: req.body.userId};
		} else if (req.body.commentId) {
			Options = {commentId: req.body.commentId, userId: req.body.userId};
		}
		await Modeltwo.findOneAndDelete(Options);

		const doc = await Modelone.create(Options);
		res.status(201).json({
			status: 'success',
			data: {
				doc,
			},
		});
	});

exports.reactDown = (Model) =>
	catchAsync(async (req, res, next) => {
		let Options = {};
		if (req.body.videoId) {
			Options = {videoId: req.body.videoId, userId: req.body.userId};
		} else if (req.body.commentId) {
			Options = {commentId: req.body.commentId, userId: req.body.userId};
		}
		const doc = await Model.findOneAndDelete(Options);
		res.status(201).json({
			status: 'success',
			data: {
				doc,
			},
		});
	});

exports.getCurrentVideoResactions = (Model) =>
	catchAsync(async (req, res, next) => {
		let Options = {};
		if (req.body.videoId) {
			Options = {videoId: req.body.videoId};
		} else if (req.body.commentId) {
			Options = {commentId: req.body.commentId};
		}

		const doc = await Model.find(Options);
		res.status(200).json({
			success: true,
			doc,
		});
	});
// crud operation
exports.createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.create(req.body);
		res.status(201).json({
			status: 'success',
			data: {
				doc,
			},
		});
	});

exports.getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		let filter = {};
		if (req.params.videoId) filter = {videoId: req.params.videoId};

		const doc = await Model.find(filter).sort('-_id');
		res.status(200).json({
			success: true,
			doc,
		});
	});

exports.getOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findById(req.params.id);
		console.log(req.params.id);
		if (!doc) {
			return next(new AppError('no document found with this ID'));
		}
		res.status(200).json({
			success: true,
			doc,
		});
	});

exports.updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!doc) {
			return next(new AppError(' no document found with this ID'));
		}

		res.status(200).json({
			success: true,
			doc,
		});
	});

exports.deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const doc = await Model.findByIdAndDelete(req.params.id);
		if (!doc) {
			return next(new AppError(' no document found with this ID'));
		}
		res.status(204).json({
			success: true,
		});
	});

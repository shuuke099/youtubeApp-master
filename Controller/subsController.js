const Subscribe = require('../Model/subsModel');
const catchAsync = require('../Utilits/catchAsync');
const User = require('../Model/UserModel');
const {createOne, getAll, getOne, updateOne, deleteOne} = require('./FactorController');

exports.getUserSubs = catchAsync(async (req, res, next) => {
	const doc = await Subscribe.find({userTo: req.body.userTo});
	res.status(200).json({
		success: true,
		doc,
	});
});

exports.unSubscribe = catchAsync(async (req, res, next) => {
	const doc = await Subscribe.findOneAndDelete(req.body);
	res.status(204).json({
		status: 'success',
		data: {
			doc,
		},
	});
});

exports.createSubs = createOne(Subscribe);
exports.getAllSubs = getAll(Subscribe);
exports.getSubs = getOne(Subscribe);
exports.updateSubs = updateOne(Subscribe);
exports.daleteSubs = deleteOne(Subscribe);

const DisLikes = require('../Model/disLikeModel');
const Likes = require('../Model/likeModel');
const Video = require('../Model/videoModel');
const catchAsync = require('../Utilits/catchAsync');
const {createReaction, getAll, getOne, updateOne, deleteOne, reactUp, reactDown, getCurrentVideoResactions} = require('./FactorController');

exports.removeDislike = catchAsync(async (req, res, next) => {
	await Likes.findOneAndDelete(req.body);

	next();
});
// ===========================

exports.disLikeUp = reactUp(DisLikes, Likes);
exports.disLikeDown = reactDown(DisLikes);
exports.getCurrentVideoDisLikes = getCurrentVideoResactions(DisLikes);
exports.getAllDisLikes = getAll(DisLikes);
exports.getDisLike = getOne(DisLikes);
exports.updateDisLike = updateOne(DisLikes);
exports.daleteDisLike = deleteOne(DisLikes);

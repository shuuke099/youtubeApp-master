const Likes = require('../Model/likeModel');
const DisLikes = require('../Model/disLikeModel');
const Video = require('../Model/videoModel');
const catchAsync = require('../Utilits/catchAsync');
const {createReaction, getAll, getOne, updateOne, deleteOne, reactUp, reactDown, getCurrentVideoResactions} = require('./FactorController');

// ==================================
exports.likeUp = reactUp(Likes, DisLikes);
exports.likeDown = reactDown(Likes);
exports.getCurrentVideoLikes = getCurrentVideoResactions(Likes);
exports.getAllLikes = getAll(Likes);
exports.getLike = getOne(Likes);
exports.updateLike = updateOne(Likes);
exports.daleteLike = deleteOne(Likes);

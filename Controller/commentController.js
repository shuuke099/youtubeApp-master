const Comment = require('../Model/CommentModel');
const catchAsync = require('../Utilits/catchAsync');
const {createOne, getAll, getOne, updateOne, deleteOne} = require('./FactorController');

exports.createComment = createOne(Comment);
exports.getAllComments = getAll(Comment);
exports.getComment = getOne(Comment);
exports.updateComment = updateOne(Comment);
exports.daleteComment = deleteOne(Comment);

const Reply = require('../Model/ReplyModel');
const {createOne, getAll, getOne, updateOne, deleteOne} = require('./FactorController');

exports.createReply = createOne(Reply);
exports.getAllReplys = getAll(Reply);
exports.getReply = getOne(Reply);
exports.updateReply = updateOne(Reply);
exports.daleteReply = deleteOne(Reply);

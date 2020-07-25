const express = require('express');
const {createReply, getAllReplys, getReply, updateReply, daleteReply} = require('../Controller/replyController');

const router = express.Router();

// router.use(protect);
router.route('/').get(getAllReplys).post(createReply);
router.route('/:id').get(getReply).patch(updateReply).delete(daleteReply);

module.exports = router;

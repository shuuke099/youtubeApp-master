const express = require('express');
const {
	createComment,
	getAllComments,
	getComment,
	updateComment,
	daleteComment,
	getCurrentComments,
} = require('../Controller/commentController');
const router = express.Router({mergeParams: true});

router.route('/').get(getAllComments);
const {protect} = require('../Controller/AuthController');
router.use(protect);
router.route('/').post(createComment);
router.route('/:id').get(getComment).patch(updateComment).delete(daleteComment);

module.exports = router;

const express = require('express');
const {
	createLike,
	getAllLikes,
	getLike,
	updateLike,
	daleteLike,
	likeUp,
	likeDown,
	getCurrentVideoLikes,
} = require('../Controller/likecontroller');
const {protect} = require('../Controller/AuthController');

const router = express.Router({mergeParams: true});
router.route('/').get(getAllLikes);
router.route('/getCurrentVideoLikes').post(getCurrentVideoLikes);
router.use(protect);
router.route('/likeUp').post(likeUp);
router.route('/likeDown').post(likeDown);
router.route('/:id').get(getLike).patch(updateLike).delete(daleteLike);

module.exports = router;

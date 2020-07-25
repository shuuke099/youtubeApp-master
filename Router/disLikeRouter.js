const express = require('express');
const {
	createDisLike,
	getAllDisLikes,
	getDisLike,
	updateDisLike,
	daleteDisLike,
	disLikeUp,
	disLikeDown,
	getCurrentVideoDisLikes,
} = require('../Controller/disLikecontroller');
const {protect} = require('../Controller/AuthController');
const router = express.Router({mergeParams: true});

router.route('/').get(getAllDisLikes);
router.route('/getCurrentVideoDisLikes').post(getCurrentVideoDisLikes);
router.use(protect);

router.route('/disLikeUp').post(disLikeUp);
router.route('/disLikeDown').post(disLikeDown);

router.route('/:id').get(getDisLike).patch(updateDisLike).delete(daleteDisLike);

module.exports = router;

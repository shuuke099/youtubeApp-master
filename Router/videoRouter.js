const express = require('express');
const {
	createVideo,
	getAllVideos,
	getVideo,
	updateVideo,
	daleteVideo,
	Upload,
	UploadVideo,
	getSearchedVideos,
} = require('../Controller/videoController');
const disLikeRouter = require('./disLikeRouter');
const likeRouter = require('./likeRouter');
const subsRouter = require('./subsRouter');
const commentRouter = require('./commentRouter');
const {protect} = require('../Controller/AuthController');

const router = express.Router();

router.route('/').get(getAllVideos);
router.route('/search').get(getSearchedVideos);
router.route('/:id').get(getVideo);
router.use('/:videoId/disLikes', disLikeRouter);
router.use('/:videoId/likes', likeRouter);
router.use('/:videoId/comments', commentRouter);
router.use(protect);
router.route('/UploadVideo').post(Upload, UploadVideo);
router.route('/').post(createVideo);
router.route('/:id').patch(updateVideo).delete(daleteVideo);

module.exports = router;

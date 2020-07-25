const path = require('path');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');
const Video = require('../Model/videoModel');
const catchAsync = require('../Utilits/catchAsync');
const {createOne, getAll, getOne, updateOne, deleteOne} = require('./FactorController');

const multerStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null,'client/public/Videouploads');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});
const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('video')) {
		cb(null, true);
	} else {
		cb(new AppError('Not an image! Please upload only images.', 400), false);
	}
};

exports.Upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
}).single('video');

exports.UploadVideo = (req, res) => {
	let videoDuration = '';
	let thumbnailPath = '';

	ffmpeg.ffprobe(req.file.path, function (err, metadata) {
		// console.dir(metadata);
		// console.dir(metadata);

		console.log(metadata.format.duration);

		videoDuration = metadata.format.duration;
	});
	ffmpeg(req.file.path)
		.on('filenames', function (filenames) {
			console.log('Will generate ' + filenames.join(', '));
			thumbnailPath = filenames;
		})
		.on('end', function () {
			console.log('Screenshots taken');
			return res.json({success: true, thumbnailPath, videoDuration, videoPath: req.file.filename});
		})
		.screenshots({
			// Will take screens at 20%, 40%, 60% and 80% of the video
			count: 3,
			folder:'client/public/Videouploads/thumbnails',
			size: '320x240',
			// %b input basename ( filename w/o extension )
			filename: 'thumbnail-%b.png',
		});
};

exports.getSearchedVideos = catchAsync(async (req, res, next) => {
	let query = {};
	if (req.query.search) {
		query.title = {$regex: req.query.search, $options: 'i'};
	}
	console.log(req.query.search);
	const doc = await Video.find(query);
	res.status(200).json({
		success: true,
		doc,
	});
});

exports.createVideo = createOne(Video);
exports.getAllVideos = getAll(Video);
exports.getVideo = getOne(Video);
exports.updateVideo = updateOne(Video);
exports.daleteVideo = deleteOne(Video);

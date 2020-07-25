const path = require('path');
const multer = require('multer');
const sharp = require('sharp');
const USer = require('../Model/UserModel');
const catchAsync = require('../Utilits/catchAsync');
const AppError = require('../Utilits/AppError');
const {createOne, getAll, getOne, updateOne, deleteOne} = require('./FactorController');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(new AppError('Not an image! Please upload only images.', 400), false);
	}
};

const upload = multer({
	storage: multerStorage,
	fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
	if (!req.file) return next();
	req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({quality: 90})
		.toFile(`client/public/users/${req.file.filename}`);

	next();
});
const filterObj = (obj, ...allowedFields) => {
	const newObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) newObj[el] = obj[el];
	});
	return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
	// 1) Create error if user POSTs password data
	console.log(req.file.filename);
	if (req.body.password || req.body.passwordConfirm) {
		return next(new AppError('This route is not for password updates. Please use /updateMyPassword.', 400));
	}

	// 2) Filtered out unwanted fields names that are not allowed to be updated
	const filteredBody = filterObj(req.body, 'name', 'email');
	if (req.file) filteredBody.photo = req.file.filename;

	// 3) Update user document
	const updatedUser = await USer.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({
		status: 'success',
		data: {
			user: updatedUser,
		},
	});
});
exports.createUSer = createOne(USer);
exports.getAllUSers = getAll(USer);
exports.getUSer = getOne(USer);
exports.updateUSer = updateOne(USer);
exports.daleteUSer = deleteOne(USer);

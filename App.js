const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const userRouter = require('./Router/userRouter');
const videoRouter = require('./Router/videoRouter');
const viewsRouter = require('./Router/viewRouter');
const disLikeRouter = require('./Router/disLikeRouter');
const likeRouter = require('./Router/likeRouter');
const subsRouter = require('./Router/subsRouter');
const commentRouter = require('./Router/commentRouter');
const replyRouter = require('./Router/replyRouter');
const globalErrorHandler = require('./Utilits/globalError');
const AppError = require('./Utilits/AppError');

const app = express();
app.enable('trust proxy');

app.use(cors());

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

// Set security HTTP headers
app.use(helmet());

const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream

// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use(compression());

// Test middleware
app.use((req, res, next) => {
	req.requestTime = new Date().toISOString();
	// console.log(req.cookies);
	next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/videos', videoRouter);
app.use('/api/v1/disLikes', disLikeRouter);
app.use('/api/v1/likes', likeRouter);
app.use('/api/v1/subscribes', subsRouter);
app.use('/api/v1/comments', commentRouter);
app.use('/api/v1/views', viewsRouter);
app.use('/api/v1/replys', replyRouter);

if (process.env.NODE_ENV === 'development') {
	app.all('*', (req, res, next) => {
		next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
	});
}

app.use(globalErrorHandler);

module.exports = app;

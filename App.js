const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const userRouter = require('./Router/userRouter');
const videoRouter = require('./Router/videoRouter');
const viewsRouter = require('./Router/viewRouter');
const disLikeRouter = require('./Router/disLikeRouter');
const likeRouter = require('./Router/likeRouter');
const subsRouter = require('./Router/subsRouter');
const commentRouter = require('./Router/commentRouter');
const replyRouter = require('./Router/replyRouter');
const cors = require('cors');
const globalErrorHandler = require('./Utilits/globalError');
const AppError = require('./Utilits/AppError');

const app = express();

app.use(cors());

app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

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

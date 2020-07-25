const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
const App = require('./App');

// const DB = process.env.DATABASE_LOCAL;
// console.log(DB);
const DB = process.env.DATABASE
mongoose
	.connect(DB, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})
	.catch((err) => {
		console.log(Error, err.message);
	})
	.then(console.log('DB successfully connected'));

const port = process.env.PORT;
const server = App.listen(port, () => {
	console.log(`App running on port ${port}...`);
});

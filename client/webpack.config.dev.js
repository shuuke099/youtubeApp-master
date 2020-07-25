const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
process.env.NODE_ENV = 'development';

module.exports = {
	mode: 'development',
	devtool: 'cheap-module-source-map',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js',
	},
	devServer: {
		stats: 'errors-warnings',

		compress: true,
		open: true,
		port: 3000,
		historyApiFallback: true,
		proxy: {
			'/api': 'http://localhost:5000',
		},
	},
	plugins: [new ErrorOverlayPlugin(), new HtmlWebpackPlugin({template: './public/index.html'})],

	module: {
		rules: [
			{test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader'},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(png|svg|jpg|gif|mp4)$/,
				use: ['file-loader'],
			},
		],
	},
};

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackBundleAnalyzer = require('webpack-bundle-analyzer');
process.env.NODE_ENV = 'production';

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js',
	},

	plugins: [
		// Display bundle stats
		new webpackBundleAnalyzer.BundleAnalyzerPlugin({analyzerMode: 'static'}),

		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),

		new webpack.DefinePlugin({
			// This global makes sure React is built in prod mode.
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'process.env.API_URL': JSON.stringify('http://localhost:3000'),
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
			minify: {
				// see https://github.com/kangax/html-minifier#options-quick-reference
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			},
		}),
	],
	module: {
		rules: [
			{test: /\.(js|jsx)$/, exclude: /node_modules/, loader: 'babel-loader'},
			{
				test: /(\.css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif|mp4)$/,
				use: ['file-loader'],
			},
		],
	},
};

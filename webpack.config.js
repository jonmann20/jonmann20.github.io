'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: ['./src/elts/icons.html'],
	output: {
		filename: 'icons.bundle.js',
		path: path.resolve(__dirname, './assets'),
		publicPath: 'assets'
	},
	resolve: {
		modules: ['node_modules'],
		descriptionFiles: ['package.json']
	},
	devtool: 'inline-source-map',
	module: {
		loaders: [{
			test: /\.html/,
			use: [
				{
					loader: 'babel-loader',
					options: {
						presets: [['env', {
							targets: {
								browsers: [
									'last 2 Chrome versions',
									'last 2 Firefox versions',
									'last 2 Edge versions',
									'last 2 Safari versions',
									'last 2 iOS versions',
									'last 2 ChromeAndroid versions'
								]
							}
						}]]
					}
				},
				{
					loader: 'polymer-webpack-loader'
				}
			]
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': "'production'"
			}
		})//,
		// NOTE: was causing build error (see gulp js:minifyBundle)
		//new webpack.optimize.UglifyJsPlugin()
	]
};
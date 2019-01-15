'use strict';

const path = require('path');

module.exports = {
	entry: {
		icons: './src/elts/icons.html',
		router: './src/js/router.js'
	},
	output: {
		path: path.resolve(__dirname, './assets'),
		publicPath: '/assets/',
		filename: '[name].js'
	},
	resolve: {
		modules: ['node_modules'],
		descriptionFiles: ['package.json']
	},
	module: {
		rules: [{
			test: /\.html/,
			use: 'polymer-webpack-loader'
		}]
	},
	mode: 'production'
};
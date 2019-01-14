'use strict';

const path = require('path');

module.exports = {
	entry: {
		icons: './src/elts/icons.html',
		'page-home': './src/elts/page-home.js'
	},
	output: {
		path: path.resolve(__dirname, './assets'),
		filename: '[name].bundle.js'
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
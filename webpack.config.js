'use strict';

const path = require('path');

module.exports = {
	entry: './src/elts/icons.html',
	output: {
		filename: 'icons.bundle.js',
		path: path.resolve(__dirname, './assets')
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
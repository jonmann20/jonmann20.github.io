'use strict';

const path = require('path');

module.exports = {
	entry: {
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
	mode: 'production'
};
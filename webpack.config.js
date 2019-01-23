'use strict';

const path = require('path');

module.exports = {
	entry: {
		router: './js/router.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		//publicPath: '/dist/',
		filename: '[name].js'
	},
	resolve: {
		modules: ['node_modules'],
		descriptionFiles: ['package.json']
	},
	mode: 'production'
};
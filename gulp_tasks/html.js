/* eslint indent: 0 */

import {src, dest} from 'gulp';
import htmlmin from 'gulp-htmlmin';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

function bundleComponents() {
	const webpackConfig = require('../webpack.config.js');

	return src([
			'src/elts/**/*.js',
			'src/js/router.js'
		]).
		pipe(webpackStream(webpackConfig, webpack)).
		pipe(dest('assets'));
}

function htmlMinify() {
	return src(['**/*.html', '!src/**', '!node_modules/**']).
		pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true,
			minifyJS: true,
			minifyCSS: true
		})).
		pipe(dest('./'));
}

export {
	bundleComponents,
	htmlMinify
};
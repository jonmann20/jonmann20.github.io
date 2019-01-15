/* eslint indent: 0 */

import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

function bundleComponents() {
	const webpackConfig = require('../webpack.config.js');

	return gulp.src([
			'src/elts/**/*.js',
			'src/js/router.js'
		]).
		pipe(webpackStream(webpackConfig, webpack)).
		pipe(gulp.dest('assets'));
}

function htmlMinify() {
	return gulp.src(['**/*.html', '!src/**', '!node_modules/**']).
		pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true,
			minifyJS: true,
			minifyCSS: true
		})).
		pipe(gulp.dest('./'));
}

export {
	bundleComponents,
	htmlMinify
};
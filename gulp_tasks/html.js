/* eslint-disable indent */
import {src, dest} from 'gulp';
import htmlmin from 'gulp-htmlmin';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import replace from 'gulp-replace';

function bundleComponents() {
	const webpackConfig = require('../webpack.config.js');

	return src([
			'elts/**/*.js',
			'js/router.js'
		]).
		pipe(webpackStream(webpackConfig, webpack)).
		pipe(dest('dist'));
}


function prdIndex() {
	return src('dist/index.html').
		pipe(replace('isDev = true', 'isDev = false')).
		pipe(dest('dist'));
}

function htmlMinify() {
	return src(['dist/**/*.html', '!dist/node_modules/**']).
		pipe(htmlmin({
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true,
			minifyJS: true,
			minifyCSS: true
		})).
		pipe(dest('dist'));
}

export {
	prdIndex,
	bundleComponents,
	htmlMinify
};
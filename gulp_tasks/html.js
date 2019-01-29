/* eslint-disable indent */
import {src, dest, parallel} from 'gulp';
import htmlmin from 'gulp-htmlmin';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import replace from 'gulp-replace';

function bundleComponents() {
	return src([
			'js/router.js',
			'games/vamp/js/main.js',
			'games/dormanticide/js/main.js'
		]).
		pipe(webpackStream(require('../webpack.config.babel.js'), webpack)).
		pipe(dest('dist'));
}


function prdAppIndex() {
	return src('dist/index.html').
		pipe(replace('isDev = true', 'isDev = false')).
		pipe(replace('js/router.js', 'router.js')).
		pipe(dest('dist'));
}

function prdVampIndex() {
	return src('dist/games/vamp/index.html').
		pipe(replace('js/main.js', '/vamp.js')).
		pipe(dest('dist/games/vamp'));
}

function prdDormanticideIndex() {
	return src('dist/games/dormanticide/index.html').
		pipe(replace('js/main.js', '/dormanticide.js')).
		pipe(dest('dist/games/dormanticide'));
}

const prdIndex = parallel(
	prdAppIndex,
	prdVampIndex,
	prdDormanticideIndex
);

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
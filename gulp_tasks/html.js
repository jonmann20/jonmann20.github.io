import gulp from 'gulp';
import htmlmin from 'gulp-htmlmin';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';

function htmlBundleIcons() {
	const webpackConfig = require('../webpack.config.js');

	return gulp.src('src/elts/icons.html').
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
	htmlBundleIcons,
	htmlMinify
};
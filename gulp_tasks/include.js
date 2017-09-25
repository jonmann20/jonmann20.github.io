'use strict';

module.exports = (gulp, isDev, iff) => {
	const fileInclude = require('gulp-file-include'),
		htmlmin = require('gulp-htmlmin'),
		webpack = require('webpack-stream');

	return (() => {
		gulp.task('include', () => {
			return gulp.src(['src/**/*.html', '!src/icons.html']).
				pipe(fileInclude({prefix: '@@', basepath: '@file'})).
				pipe(iff(!isDev, htmlmin({
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					minifyJS: true,
					minifyCSS: true
				}))).
				pipe(gulp.dest('./'));
		});

		gulp.task('bundle:icons', () => {
			return gulp.src('src/icons.html').
				pipe(webpack(require('../webpack.config.js'))).
				pipe(gulp.dest('assets'));
		});

		gulp.task('html:minifyIndex', () => {
			return gulp.src('index.html').
				pipe(iff(!isDev, htmlmin({
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					minifyJS: true,
					minifyCSS: true
				}))).
				pipe(gulp.dest('./'));
		});
	})();
};
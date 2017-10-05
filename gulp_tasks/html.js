'use strict';

module.exports = (gulp) => {
	const htmlmin = require('gulp-htmlmin'),
		webpack = require('webpack-stream');

	return (() => {
		gulp.task('html:bundleIcons', () => {
			return gulp.src('src/elts/icons.html').
				pipe(webpack(require('../webpack.config.js'))).
				pipe(gulp.dest('assets'));
		});

		gulp.task('html:minify', () => {
			return gulp.src(['**/*.html', '!src/**', '!node_modules/**', '!bower_components/**']).
				pipe(htmlmin({
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					minifyJS: true,
					minifyCSS: true
				})).
				pipe(gulp.dest('./'));
		});
	})();
};
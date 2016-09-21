'use strict';

module.exports = (gulp, isDev, iff, liveReload) => {
	let fileInclude = require('gulp-file-include');
	let htmlmin = require('gulp-htmlmin');

	return (() => {
		gulp.task('include', () => {
			return gulp.src(['src/**/*.html']).
				pipe(fileInclude({
					prefix: '@@',
					basepath: '@file'
				})).
				pipe(iff(!isDev, htmlmin({
					removeComments: true,
					collapseWhitespace: true,
					removeAttributeQuotes: true,
					removeEmptyAttributes: true,
					minifyJS: true,
					minifyCSS: true
				}))).
				pipe(gulp.dest('./')).
				pipe(iff(isDev, liveReload()));
		});
	})();
};

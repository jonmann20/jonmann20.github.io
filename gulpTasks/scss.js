'use strict';

module.exports = (gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc) => {
	let minifyCss = require('gulp-minify-css'); // TODO: use gulp-clean-css
	let scss = require('gulp-sass');

	return (() => {
		gulp.task('scss', () => {
			return gulp.src(scssSrc).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(scss()).
				pipe(iff(!isDev, minifyCss())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets/css')).
				pipe(iff(isDev, liveReload()));
		});
	})();
};

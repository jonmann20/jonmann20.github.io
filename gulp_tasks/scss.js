'use strict';

module.exports = (gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc) => {
	let cleanCss = require('gulp-clean-css');
	let scss = require('gulp-sass');

	return (() => {
		gulp.task('scss:all', () => {
			return gulp.src(scssSrc).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(scss()).
				pipe(iff(!isDev, cleanCss())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets/css')).
				pipe(iff(isDev, liveReload()));
		});

		gulp.task('concat:master', () => {
			return gulp.src([
					'assets/css/normalize.css',
					'assets/css/base.css',
					'assets/css/layout.css',
					'assets/css/state/home.css',
					'assets/css/state/games.css',
					'assets/css/state/music.css',
					'assets/css/state/playground.css',
					'assets/css/state/portfolio.css',
					'assets/css/state/responsive.css'
				]).
				pipe(concat('master.css')).
				pipe(gulp.dest('assets'));
		});

		gulp.task('scss', gulp.series('scss:all', 'concat:master'));
	})();
};

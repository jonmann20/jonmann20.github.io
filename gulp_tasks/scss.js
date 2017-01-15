'use strict';

module.exports = (gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc) => {
	const cleanCss = require('gulp-clean-css'),
		scss = require('gulp-sass'),
		sassLint = require('gulp-sass-lint');

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

		gulp.task('scss-lint', () => {
			return gulp.src(scssSrc).
				pipe(sassLint({
					files: {
						ignore: [
							'src/scss/font-icons.scss',
							'src/scss/normalize.scss'
						]
					}
				})).
				pipe(sassLint.format()).
				pipe(sassLint.failOnError());
		});

		gulp.task('concat:master', () => {
			return gulp.src([
					'node_modules/normalize.css/normalize.css',
					'assets/css/base.css',
					'assets/css/layout.css',
					'assets/css/state/home.css',
					'assets/css/state/games.css',
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
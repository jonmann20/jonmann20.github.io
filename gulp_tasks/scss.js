'use strict';

module.exports = (gulp, isDev, iff, concat, sourcemaps, replace, fs) => {
	const cleanCss = require('gulp-clean-css'),
		scss = require('gulp-sass'),
		scssSrc = 'src/scss/**/*.scss',
		sassLint = require('gulp-sass-lint');

	return (() => {
		gulp.task('scss:all', () => {
			return gulp.src(scssSrc).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(scss()).
				pipe(iff(!isDev, cleanCss())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets/css'));
		});

		gulp.task('scss-lint', () => {
			return gulp.src(scssSrc).
				pipe(sassLint()).
				pipe(sassLint.format()).
				pipe(sassLint.failOnError());
		});

		gulp.task('concat:master', () => {
			return gulp.src([
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

		gulp.task('css:inline', () => {
			return gulp.src('index.html').
				pipe(replace(/<link rel=stylesheet href=\/assets\/master.css>/, () => {
					const styles = fs.readFileSync(`${__dirname}/../assets/master.css`, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest('./'));
		});

		gulp.task('scss', gulp.series('scss:all', 'concat:master'));
	})();
};
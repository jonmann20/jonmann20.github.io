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
					'assets/css/shell.css',
					'assets/css/state/responsive.css'
				]).
				pipe(concat('master.css')).
				pipe(gulp.dest('assets'));
		});

		gulp.task('css:inlineIndex', () => {
			return gulp.src('index.html').
				pipe(replace(/<link rel=stylesheet href=\/assets\/master.css>/, () => {
					const styles = fs.readFileSync(`${__dirname}/../assets/master.css`, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest('./'));
		});

		gulp.task('css:inlineHome', () => {
			return gulp.src('home.html').
				pipe(replace(/<link rel=stylesheet href=\/assets\/css\/state\/home.css>/, () => {
					const styles = fs.readFileSync(`${__dirname}/../assets/css/state/home.css`, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest('./'));
		});

		gulp.task('css:inlineGames', () => {
			return gulp.src('games/index.html').
				pipe(replace(/<link rel=stylesheet href=\/assets\/css\/state\/games.css>/, () => {
					const styles = fs.readFileSync(`${__dirname}/../assets/css/state/games.css`, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest('./games'));
		});

		gulp.task('css:inlinePlayground', () => {
			return gulp.src('playground/index.html').
				pipe(replace(/<link rel=stylesheet href=\/assets\/css\/state\/playground.css>/, () => {
					const styles = fs.readFileSync(`${__dirname}/../assets/css/state/playground.css`, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest('./playground'));
		});

		gulp.task('css:inlineBreakdancingCube', () => {
			return gulp.src('playground/breakdancing-cube.html').
				pipe(replace(/<link rel=stylesheet href=\/assets\/css\/state\/breakdancing-cube.css>/, () => {
					const styles = fs.readFileSync(`${__dirname}/../assets/css/state/breakdancing-cube.css`, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest('./playground'));
		});

		gulp.task('css:inlineStars', () => {
			return gulp.src('playground/stars.html').
				pipe(replace(/<link rel=stylesheet href=\/assets\/css\/state\/stars.css>/, () => {
					const styles = fs.readFileSync(`${__dirname}/../assets/css/state/stars.css`, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest('./playground'));
		});

		gulp.task('css:inlineBallPit', () => {
			return gulp.src('playground/ball-pit.html').
				pipe(replace(/<link rel=stylesheet href=\/assets\/css\/state\/ball-pit.css>/, () => {
					const styles = fs.readFileSync(`${__dirname}/../assets/css/state/ball-pit.css`, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest('./playground'));
		});

		gulp.task('css:inlinePortfolio', () => {
			return gulp.src('portfolio/index.html').
				pipe(replace(/<link rel=stylesheet href=\/assets\/css\/state\/portfolio.css>/, () => {
					const styles = fs.readFileSync(`${__dirname}/../assets/css/state/portfolio.css`, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest('./portfolio'));
		});

		gulp.task('css:inline', gulp.parallel(
			'css:inlineIndex',
			'css:inlineHome',
			'css:inlineGames',
			'css:inlinePlayground',
			'css:inlineBreakdancingCube',
			'css:inlineStars',
			'css:inlineBallPit',
			'css:inlinePortfolio'
		));

		gulp.task('scss', gulp.series('scss:all', 'concat:master'));
	})();
};
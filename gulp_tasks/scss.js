'use strict';

module.exports = (gulp, isDev, iff, concat, sourcemaps, replace, fs) => {
	const cleanCss = require('gulp-clean-css'),
		scss = require('gulp-sass'),
		scssSrc = 'src/scss/*.scss',
		sassLint = require('gulp-sass-lint');

	return (() => {
		gulp.task('scss-lint', () => {
			return gulp.src(scssSrc).
				pipe(sassLint()).
				pipe(sassLint.format()).
				pipe(sassLint.failOnError());
		});

		gulp.task('scss', () => {
			return gulp.src(scssSrc).
				pipe(iff(isDev, sourcemaps.init())).
				pipe(scss()).
				pipe(iff(!isDev, cleanCss())).
				pipe(iff(isDev, sourcemaps.write())).
				pipe(gulp.dest('assets/css'));
		});

		function inline(src, filename, dest) {
			const cond = `<link rel="stylesheet" href="${filename}">`;
			const file = `${__dirname}/..${filename}`;

			return gulp.src(src).
				pipe(replace(cond, () => {
					const styles = fs.readFileSync(file, 'utf8');
					return `<style>${styles}</style>`;
				})).
				pipe(gulp.dest(dest));
		}

		gulp.task('css:inlineIndex', () => inline('index.html', '/assets/css/shell.css', './'));
		gulp.task('css:inlineHome', () => inline('home.html', '/assets/css/home.css', './'));
		gulp.task('css:inlineGames', () => inline('games/index.html', '/assets/css/games.css', './games'));
		gulp.task('css:inlineVamp', () => inline('games/vamp/index.html', '/assets/css/shell.css', './games/vamp'));
		//gulp.task('css:inlineVamp2', () => inline('games/vamp/index.html', '/games/common/css/main.css', './games/vamp'));
		gulp.task('css:inlineDormanticide', () => inline('games/dormanticide/index.html', '/assets/css/shell.css', './games/dormanticide'));
		//gulp.task('css:inlineDormanticide2', () => inline('games/dormanticide/index.html', '/games/common/css/main.css', './games/dormanticide'));
		gulp.task('css:inlinePlayground', () => inline('playground/index.html', '/assets/css/playground.css', './playground'));
		gulp.task('css:inlineBreakdancingCube', () => inline('playground/breakdancing-cube.html', '/assets/css/breakdancing-cube.css', './playground'));
		gulp.task('css:inlineStars', () => inline('playground/stars.html', '/assets/css/stars.css', './playground'));
		gulp.task('css:inlineBallPit', () => inline('playground/ball-pit.html', '/assets/css/ball-pit.css', './playground'));
		gulp.task('css:inlinePortfolio', () => inline('portfolio/index.html', '/assets/css/portfolio.css', './portfolio'));

		gulp.task('css:inline', gulp.parallel(
			'css:inlineIndex',
			'css:inlineHome',
			'css:inlineGames',
			'css:inlineVamp',
			//'css:inlineVamp2',
			'css:inlineDormanticide',
			//'css:inlineDormanticide2',
			'css:inlinePlayground',
			'css:inlineBreakdancingCube',
			'css:inlineStars',
			'css:inlineBallPit',
			'css:inlinePortfolio'
		));
	})();
};
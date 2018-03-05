import gulp from 'gulp';
import iff from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import replace from 'gulp-replace';
import fs from 'fs';

import cleanCss from 'gulp-clean-css';
import sass from 'gulp-sass';
import sassLint from 'gulp-sass-lint';

import isDev from './env';

const scssSrc = 'src/scss/*.scss';

function _inline(src, filename, dest) {
	const cond = `<link rel="stylesheet" href="${filename}">`;
	const file = `${__dirname}/..${filename}`;

	return gulp.src(src).
		pipe(replace(cond, () => {
			const styles = fs.readFileSync(file, 'utf8');
			return `<style>${styles}</style>`;
		})).
		pipe(gulp.dest(dest));
}

function scssLint() {
	return gulp.src(scssSrc).
		pipe(sassLint()).
		pipe(sassLint.format()).
		pipe(sassLint.failOnError());
}

function scss() {
	return gulp.src(scssSrc).
		pipe(iff(isDev, sourcemaps.init())).
		pipe(sass()).
		pipe(iff(!isDev, cleanCss())).
		pipe(iff(isDev, sourcemaps.write())).
		pipe(gulp.dest('assets/css'));
}

const cssInlineIndex = () => _inline('index.html', '/assets/css/shell.css', './');
const cssInlineHome = () => _inline('home.html', '/assets/css/home.css', './');
const cssInlineGames = () => _inline('games/index.html', '/assets/css/games.css', './games');
const cssInlineVamp = () => _inline('games/vamp/index.html', '/games/common/css/main.css', './games/vamp');
const cssInlineDormanticide = () => _inline('games/dormanticide/index.html', '/games/common/css/main.css', './games/dormanticide');
const cssInlinePlayground = () => _inline('playground/index.html', '/assets/css/playground.css', './playground');
const cssInlineBreakdancingCube = () => _inline('playground/breakdancing-cube.html', '/assets/css/breakdancing-cube.css', './playground');
const cssInlineStars = () => _inline('playground/stars.html', '/assets/css/stars.css', './playground');
const cssInlineBallPit = () => _inline('playground/ball-pit.html', '/assets/css/ball-pit.css', './playground');
const cssInlinePortfolio = () => _inline('portfolio/index.html', '/assets/css/portfolio.css', './portfolio');

const cssInline = gulp.parallel(
	cssInlineIndex,
	cssInlineHome,
	cssInlineGames,
	cssInlineVamp,
	cssInlineDormanticide,
	cssInlinePlayground,
	cssInlineBreakdancingCube,
	cssInlineStars,
	cssInlineBallPit,
	cssInlinePortfolio
);

export {
	scss,
	scssLint,
	cssInline
};
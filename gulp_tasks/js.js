/* eslint indent: 0 */

import gulp from 'gulp';
import iff from 'gulp-if';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import replace from 'gulp-replace';
import fs from 'fs';

import babel from 'gulp-babel';
import uglify from 'gulp-uglify-es';
import _eslint from 'gulp-eslint';

import isDev from './env';

const gamesCommonJs = [
	'src/games/common/js/GameEngine.js',
	'src/games/common/js/GameSave.js',
	'src/games/common/js/GameInput.js',
	'src/games/common/js/GameUtils.js',
	'src/games/common/js/physics/SAT.js',
	'src/games/common/js/graphics/GameGraphics.js',
	'src/games/common/js/view/GameView.js',
	'src/games/common/js/view/TitleView.js',
	'src/games/common/js/view/GameSaveView.js'
],
lints = [
	'src/js/**/*.js',
	'gulpfile.babel.js',
	'gulp_tasks/**/*.js',
	'!src/js/analytics.js'
],
presets = [
	['@babel/preset-env', {
		targets: {
			browsers: [
				'last 2 Chrome versions',
				'last 2 Firefox versions',
				'last 2 Edge versions',
				'last 2 Safari versions',
				'last 2 iOS versions',
				'last 2 ChromeAndroid versions'
			]
		}
	}]
];

function _handleErr(e) {
	console.log(`caught error: ${e}`);
	this.emit('end');
}

function _inline(src, filename, dest) {
	const cond = `<script src="${filename}">`;
	const file = `${__dirname}/..${filename}`;

	return gulp.src(src).
		pipe(replace(cond, () => {
			const styles = fs.readFileSync(file, 'utf8');
			return `<script>${styles}`;
		})).
		pipe(gulp.dest(dest));
}

function jsMaster() {
	let src = [
		'src/js/util.js',
		'src/js/controllers/*.js',
		'src/js/router.js',
		'src/js/main.js'
	];

	if(!isDev) {
		src.push('src/js/analytics.js', 'src/js/clientSideLogging.js');
	}

	return gulp.src(src).
		pipe(iff(isDev, sourcemaps.init())).
		pipe(concat('master.js')).
		pipe(iff(!isDev, babel({presets}).on('error', _handleErr))).
		pipe(iff(!isDev, uglify())).
		pipe(iff(isDev, sourcemaps.write())).
		pipe(gulp.dest('assets'));
}

function jsPageDormanticide() {
	return gulp.src(gamesCommonJs.concat([
			'src/games/dormanticide/js/view/OverworldView.js',
			'src/games/dormanticide/js/view/BattleView.js',
			'src/games/dormanticide/js/dormant/Dormant.js',
			'src/games/dormanticide/js/dormant/FightAction.js',
			'src/games/dormanticide/js/main.js'
		])).
		pipe(iff(isDev, sourcemaps.init())).
		pipe(concat('pageDormanticide.js')).
		// NOTE: babel was causing page to break (due to SAT.js)
		//pipe(iff(!isDev, babel({presets}).on('error', _handleErr))).
		pipe(iff(!isDev, uglify())).
		pipe(iff(isDev, sourcemaps.write())).
		pipe(gulp.dest('assets'));
}

function jsPageVamp() {
	return gulp.src(gamesCommonJs.concat([
			'src/games/vamp/js/view/LevelView.js',
			'src/games/vamp/js/level/level1.js',
			'src/games/vamp/js/vamp.js',
			'src/games/vamp/js/main.js'
		])).
		pipe(iff(isDev, sourcemaps.init())).
		pipe(concat('pageVamp.js')).
		// NOTE: babel was causing page to break (due to SAT.js)
		//pipe(iff(!isDev, babel({presets}).on('error', _handleErr))).
		pipe(iff(!isDev, uglify())).
		pipe(iff(isDev, sourcemaps.write())).
		pipe(gulp.dest('assets'));
}

function jsOther() {
	return gulp.src([
			'src/js/ballPit.js',
			'src/js/stars.js',
			'src/js/listCarousel.js'
		]).
		pipe(iff(isDev, sourcemaps.init())).
		pipe(iff(!isDev, babel({presets}).on('error', _handleErr))).
		pipe(iff(!isDev, uglify())).
		pipe(iff(isDev, sourcemaps.write())).
		pipe(gulp.dest('assets'));
}

function jsServiceWorker() {
	return gulp.src('src/js/sw.js').
	pipe(replace('const CACHE_VERSION = 1;', () => {
		return `const CACHE_VERSION = ${new Date().getTime()};`;
	})).
	pipe(gulp.dest('./'));
}

eslint.description = 'Lint JavaScript files';
function eslint() {
	return gulp.src(lints).
		pipe(_eslint('.eslintrc.js')).
		pipe(_eslint.format()).
		pipe(_eslint.failAfterError());
}

function jsInlineIndex() {
	return _inline('index.html', '/assets/master.js', './');
}

function jsInlineIndex2() {
	return _inline(
		'index.html',
		'/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
		'./'
	);
}

function jsInlineDormanticide() {
	return _inline(
		'games/dormanticide/index.html',
		'/assets/pageDormanticide.js',
		'./games/dormanticide'
	);
}

function jsInlineVamp() {
	return _inline(
		'games/vamp/index.html',
		'/assets/pageVamp.js',
		'./games/vamp'
	);
}

function jsIconBundleMinify() {
	return gulp.src('assets/icons.bundle.js').
		pipe(iff(!isDev, babel({presets}).on('error', _handleErr))).
		pipe(iff(!isDev, uglify())).
		pipe(gulp.dest('assets'));
}

const jsInline = gulp.parallel(
	jsInlineIndex,
	jsInlineDormanticide,
	jsInlineVamp
);

const js = gulp.parallel(
	jsMaster,
	jsPageDormanticide,
	jsPageVamp,
	jsOther,
	jsServiceWorker
);

export {
	js,
	eslint,
	jsInline,
	jsInlineIndex2,
	jsIconBundleMinify
};
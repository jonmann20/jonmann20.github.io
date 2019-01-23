/* eslint indent: 0 */
import gulp from 'gulp';
import iff from 'gulp-if';
import concat from 'gulp-concat';
import sourcemaps from 'gulp-sourcemaps';
import replace from 'gulp-replace';
//import fs from 'fs';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify-es';
import _eslint from 'gulp-eslint';
import isDev from './env';

const gamesCommonJs = [
	'games/common/js/GameEngine.js',
	'games/common/js/GameSave.js',
	'games/common/js/GameInput.js',
	'games/common/js/GameUtils.js',
	'games/common/js/physics/SAT.js',
	'games/common/js/graphics/GameGraphics.js',
	'games/common/js/view/GameView.js',
	'games/common/js/view/TitleView.js',
	'games/common/js/view/GameSaveView.js'
],
lints = [
	'js/**/*.js',
	'elts/**/*.js',
	'gulpfile.babel.js',
	'gulp_tasks/**/*.js',
	'!js/analytics.js'
],
babelConfig = {
	presets: [
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
	],
	plugins: ['@babel/plugin-syntax-dynamic-import']
};

function _handleErr(e) {
	console.log(`caught error: ${e}`);
	this.emit('end');
}

// function _inline(src, filename, dest) {
// 	const cond = `<script src="${filename}">`;
// 	const file = `${__dirname}/..${filename}`;

// 	return gulp.src(src).
// 		pipe(replace(cond, () => {
// 			const styles = fs.readFileSync(file, 'utf8');
// 			return `<script>${styles}`;
// 		})).
// 		pipe(gulp.dest(dest));
// }

function jsPrd() {
	return gulp.src([
			'js/analytics.js',
			'js/clientSideLogging.js'
		]).
		pipe(concat('prd.js')).
		pipe(iff(!isDev, babel(babelConfig).on('error', _handleErr))).
		pipe(iff(!isDev, uglify())).
		pipe(gulp.dest('dist'));
}

function jsPageDormanticide() {
	return gulp.src(gamesCommonJs.concat([
			'games/dormanticide/js/view/OverworldView.js',
			'games/dormanticide/js/view/BattleView.js',
			'games/dormanticide/js/dormant/Dormant.js',
			'games/dormanticide/js/dormant/FightAction.js',
			'games/dormanticide/js/main.js'
		])).
		pipe(iff(isDev, sourcemaps.init())).
		pipe(concat('pageDormanticide.js')).
		// NOTE: babel was causing page to break (due to SAT.js)
		//pipe(iff(!isDev, babel(babelConfig).on('error', _handleErr))).
		pipe(iff(!isDev, uglify())).
		pipe(iff(isDev, sourcemaps.write())).
		pipe(gulp.dest('games/dormanticide/assets'));
}

function jsPageVamp() {
	return gulp.src(gamesCommonJs.concat([
			'games/vamp/js/view/LevelView.js',
			'games/vamp/js/level/level1.js',
			'games/vamp/js/vamp.js',
			'games/vamp/js/main.js'
		])).
		pipe(iff(isDev, sourcemaps.init())).
		pipe(concat('pageVamp.js')).
		// NOTE: babel was causing page to break (due to SAT.js)
		//pipe(iff(!isDev, babel(babelConfig).on('error', _handleErr))).
		pipe(iff(!isDev, uglify())).
		pipe(iff(isDev, sourcemaps.write())).
		pipe(gulp.dest('games/vamp/assets'));
}

function jsServiceWorker() {
	return gulp.src('js/sw.js').
	pipe(replace('const CACHE_VERSION = 1;', () => {
		return `const CACHE_VERSION = ${new Date().getTime()};`;
	})).
	pipe(gulp.dest('dist'));
}

eslint.description = 'Lint JavaScript files';
function eslint() {
	return gulp.src(lints).
		pipe(_eslint('.eslintrc.js')).
		pipe(_eslint.format()).
		pipe(_eslint.failAfterError());
}

// function jsInlineIndex() {
// 	return _inline('index.html', '/dist/router.js', './');
// }

// function jsInlineIndex2() {
// 	return _inline(
// 		'index.html',
// 		'/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
// 		'./'
// 	);
// }

// function jsInlineDormanticide() {
// 	return _inline(
// 		'games/dormanticide/index.html',
// 		'/dist/pageDormanticide.js',
// 		'./games/dormanticide'
// 	);
// }

// function jsInlineVamp() {
// 	return _inline(
// 		'games/vamp/index.html',
// 		'/dist/pageVamp.js',
// 		'./games/vamp'
// 	);
// }

function jsMinifyBundles() {
	return gulp.src('dist/*.bundle.js').
		pipe(iff(isDev, sourcemaps.init())).
		pipe(iff(!isDev, babel(babelConfig).on('error', _handleErr))).
		pipe(iff(!isDev, uglify())).
		pipe(iff(isDev, sourcemaps.write())).
		pipe(gulp.dest('dist'));
}

// const jsInline = gulp.parallel(
// 	//jsInlineIndex,
// 	jsInlineDormanticide,
// 	jsInlineVamp
// );

const js = gulp.parallel(
	jsPageDormanticide,
	jsPageVamp,
	jsServiceWorker,
	jsPrd
);

export {
	js,
	eslint,
	//jsInline,
	//jsInlineIndex2,
	jsMinifyBundles
};
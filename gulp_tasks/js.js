/* eslint-disable indent */
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

const babelConfig = {
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

function _inline(src, dest, assetSrc, assetFile, module = false) {
	const cond = `<script src="${assetSrc}"${module ? ' type="module"' : ''}>`;
	const file = `${__dirname}/../${assetFile}`;

	return gulp.src(src).
		pipe(replace(cond, () => {
			const scriptContent = fs.readFileSync(file, 'utf8');
			return `<script>${scriptContent}`;
		})).
		pipe(gulp.dest(dest));
}

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

function jsServiceWorker() {
	return gulp.src('js/sw.js').
	pipe(replace('const CACHE_VERSION = 1;', () => {
		return `const CACHE_VERSION = ${new Date().getTime()};`;
	})).
	pipe(gulp.dest('dist'));
}

eslint.description = 'Lint JavaScript files';
function eslint() {
	return gulp.src([
			'js/**/*.js',
			'elts/**/*.js',
			'gulpfile.babel.js',
			'webpack.config.babel.js',
			'gulp_tasks/**/*.js',
			'!js/analytics.js'
		]).
		pipe(_eslint('.eslintrc.js')).
		pipe(_eslint.format()).
		pipe(_eslint.failAfterError());
}

function jsInlineIndex() {
	return _inline('dist/index.html', 'dist', 'router.js', 'dist/router.js', true);
}

// function jsInlineIndex2() {
// 	return _inline(
// 		'dist/index.html',
//		'dist',
// 		'/node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
// 		'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js'
// 	);
// }

// function jsInlineDormanticide() {
// 	return _inline(
// 		'games/dormanticide/index.html',
//		'dist/games/dormanticide',
// 		'js/main.js',
// 		'games/dormanticide/js/main.js'
// 	);
// }

// function jsInlineVamp() {
// 	return _inline(
// 		'games/vamp/index.html',
//		'dist/games/vamp',
// 		'js/main.js',
// 		'games/vamp/js/main.js'
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

export {
	eslint,
	jsServiceWorker,
	jsPrd,
	jsInlineIndex,
	jsMinifyBundles
};
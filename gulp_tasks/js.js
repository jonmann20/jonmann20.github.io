/* eslint-disable indent */
import gulp from 'gulp';
import replace from 'gulp-replace';
import fs from 'fs';
import _eslint from 'gulp-eslint';

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
			'games/common/js/**/*.js',
			'!games/common/js/physics/SAT.js',
			'games/vamp/**/*.js',
			'games/dormanticide/**/*.js',
			'gulpfile.babel.js',
			'webpack.config.babel.js',
			'gulp_tasks/**/*.js',
			'!js/prd.js'
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

export {
	eslint,
	jsServiceWorker,
	jsInlineIndex
};
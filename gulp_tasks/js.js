/* eslint-disable indent */
import {src, dest, parallel} from 'gulp';
import replace from 'gulp-replace';
import fs from 'fs';
import _eslint from 'gulp-eslint';

eslint.description = 'Lint JavaScript files';
function eslint() {
	return src([
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

function jsServiceWorker() {
	return src('js/sw.js').
	pipe(replace('const CACHE_VERSION = 1;', () => {
		return `const CACHE_VERSION = ${new Date().getTime()};`;
	})).
	pipe(dest('dist'));
}

function _inline(_src, _dest, assetSrc, assetFile, module = true) {
	const cond = `<script src="${assetSrc}"${module ? ' type="module"' : ''}>`;
	const file = `${__dirname}/../${assetFile}`;

	return src(_src).
		pipe(replace(cond, () => {
			const scriptContent = fs.readFileSync(file, 'utf8');
			return `<script>${scriptContent}`;
		})).
		pipe(dest(_dest));
}

function jsInlineIndex() {
	return _inline(
		'dist/index.html', 'dist',
		'router.js', 'dist/router.js'
	);
}

// function jsInlineIndex2() {
// 	return _inline(
// 		'dist/index.html', 'dist',
// 		'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
// 		'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
// 		false
// 	);
// }

function jsInlineDormanticide() {
	return _inline(
		'dist/games/dormanticide/index.html', 'dist/games/dormanticide',
		'/dormanticide.js', 'dist/dormanticide.js'
	);
}

function jsInlineVamp() {
	return _inline(
		'dist/games/vamp/index.html', 'dist/games/vamp',
		'/vamp.js', 'dist/vamp.js'
	);
}

const jsInline = parallel([
	jsInlineIndex,
	jsInlineDormanticide,
	jsInlineVamp
]);

export {
	eslint,
	jsServiceWorker,
	jsInline
};
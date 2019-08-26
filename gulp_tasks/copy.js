import {src, dest} from 'gulp';

export default function copy() {
	return src([
		'.nojekyll',
		'CNAME',
		'index.html',
		'github-user-search.html',
		'github-user-search.js',
		'offline.html',
		'manifest.json',
		'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
		'node_modules/@webcomponents/webcomponentsjs/bundles/*.js',
		'img/**/*',
		'games/**/*'
	], {base: './'}).pipe(dest('dist'));
}
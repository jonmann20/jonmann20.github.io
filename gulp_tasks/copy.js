import {src, dest} from 'gulp';

export default function copy() {
	return src([
		'.nojekyll',
		'CNAME',
		'index.html',
		'offline.html',
		'manifest.json',
		'img/**/*',
		'games/**/*'
	], {base: './'}).pipe(dest('dist'));
}
/* eslint indent: 0 */
import {src, dest} from 'gulp';

export default function copy() {
	return src([
			'.nojekyll',
			'CNAME',
			'index.html',
			'offline.html',
			'manifest.json',
			'node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js',
			'img/**/*',
			'games/**/*'
		], {
			base: './'
		}).
		pipe(dest('dist'));
}

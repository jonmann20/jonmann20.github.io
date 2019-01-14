/* eslint indent: 0 */

import gulp from 'gulp';

copy.description = 'Copy files from `src` to `/`';
export default function copy() {
	return gulp.src([
		'src/**',
		'!src/scss',
		'!src/scss/**',
		'!src/js',
		'!src/js/controllers',
		'!src/js/controllers/**',
		'!src/js/util.js',
		'!src/js/main.js',
		'!src/js/router.js',
		'!src/js/ballPit.js',
		'!src/js/stars.js',
		'!src/js/listCarousel.js',
		'!src/js/analytics.js',
		'!src/js/clientSideLogging.js'
	]).
	pipe(gulp.dest('./'));
}
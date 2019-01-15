/* eslint indent: 0 */

import gulp from 'gulp';

copy.description = 'Copy files from `src` to `/`';
export default function copy() {
	return gulp.src([
		'src/**'
	]).
	pipe(gulp.dest('./'));
}
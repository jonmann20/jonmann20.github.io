import gulp from 'gulp';
import copy from './copy';
//import {cssLint} from './scss';
//import {js, eslint} from './js';

export default function watch(done) {
	gulp.watch(['src/**'], gulp.series(copy/*, 'eslint:html'*/));
	//gulp.watch('src/elts/styles/*.js', gulp.series(cssLint));
	//gulp.watch('src/**/*.js', gulp.series(js, eslint));

	done();
}
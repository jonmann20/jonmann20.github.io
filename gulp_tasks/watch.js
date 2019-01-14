import gulp from 'gulp';
import copy from './copy';
import {scss, scssLint} from './scss';
import {js, eslint} from './js';

export default function watch(done) {
	gulp.watch(['src/**/*.html', 'src/elts/**/*'], gulp.series(copy/*, 'eslint:html'*/));
	gulp.watch('src/scss/*.scss', gulp.series(scss, scssLint));
	gulp.watch('src/**/*.js', gulp.series(js, eslint));

	done();
}
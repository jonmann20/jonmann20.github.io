'use strict';

const concat = require('gulp-concat'),
	gulp = require('gulp'),
	iff = require('gulp-if'),
	sourcemaps = require('gulp-sourcemaps'),
	isDev = process.argv.length === 2,
	scssSrc = ['src/scss/**/*.scss', '!vars.scss'];

require('./gulp_tasks/copy')(gulp);
require('./gulp_tasks/del')(gulp);
require('./gulp_tasks/include')(gulp, isDev, iff);
require('./gulp_tasks/js')(gulp, isDev, iff, concat, sourcemaps);
require('./gulp_tasks/scss')(gulp, isDev, iff, concat, sourcemaps, scssSrc);
require('./gulp_tasks/server')(gulp);
require('./gulp_tasks/watch')(gulp, scssSrc);

gulp.task('default', gulp.series(
	gulp.parallel('scss', 'js', 'copy', 'include'/*, 'include:bundle'*/),
	gulp.parallel('srv', 'watch')
));

gulp.task('test', gulp.parallel('scss-lint', 'jscs', 'jshint'));

gulp.task('prd', gulp.series(
	gulp.parallel('scss', 'test', 'js', 'copy', 'include'),
	gulp.series('include:bundle', 'js:minifyBundle')
));
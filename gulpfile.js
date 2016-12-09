'use strict';

const argv = require('yargs').argv,
	concat = require('gulp-concat'),
	gulp = require('gulp'),
	iff = require('gulp-if'),
	liveReload = require('gulp-livereload'),
	sourcemaps = require('gulp-sourcemaps'),
	isDev = argv._.length === 0,
	scssSrc = ['src/scss/**/*.scss', '!vars.scss'];

require('./gulp_tasks/del')(gulp);
require('./gulp_tasks/scss')(gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc);
require('./gulp_tasks/js')(gulp, isDev, iff, concat, liveReload, sourcemaps);
require('./gulp_tasks/copy')(gulp);
require('./gulp_tasks/include')(gulp, isDev, iff, liveReload);
require('./gulp_tasks/server')(gulp);
require('./gulp_tasks/watch')(gulp, liveReload, scssSrc);

gulp.task('default', gulp.series(
	'scss',
	gulp.parallel(
		'js',
		'copy',
		'include'
	),
	gulp.parallel(
		'server',
		'watch' // NOTE: keep dependencies up to date
	)
));

gulp.task('test', gulp.series('scss-lint', 'jscs', 'jshint'));

gulp.task('prd', gulp.series(
	'scss',
	gulp.parallel(
		'test',
		'js',
		'copy',
		'include'
	)
));

gulp.task('srv', gulp.series('server'));
'use strict';

const argv = require('yargs').argv;
const concat = require('gulp-concat');
const gulp = require('gulp');
const iff = require('gulp-if');
const liveReload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');

const isDev = argv._.length === 0;

const scssSrc = ['src/scss/**/*.scss', '!vars.scss'];

require('./gulp_tasks/del')(gulp);
require('./gulp_tasks/scss')(gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc);
require('./gulp_tasks/js')(gulp, isDev, iff, concat, liveReload, sourcemaps);
require('./gulp_tasks/copy')(gulp);
require('./gulp_tasks/include')(gulp, isDev, iff, liveReload);
require('./gulp_tasks/server')(gulp);
require('./gulp_tasks/watch')(gulp, liveReload, scssSrc);

gulp.task('default', gulp.series(
	gulp.parallel(
		'scss',
		'js',
		'copy',
		'include'
	),
	gulp.parallel(
		'server',
		'watch' // NOTE: keep dependencies up to date
	)
));

gulp.task('prd', gulp.parallel(
	'scss',
	'js',
	'copy',
	'include'
));

gulp.task('srv', gulp.series('server'));

//gulp.task('test', [/*'jasmine',*/'jshint', 'scsslint']);
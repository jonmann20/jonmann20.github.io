'use strict';

let argv = require('yargs').argv;
let concat = require('gulp-concat');
let gulp = require('gulp');
let iff = require('gulp-if');
let liveReload = require('gulp-livereload'); // TODO: inject into page if isDev
let sourcemaps = require('gulp-sourcemaps');

const isDev = argv._.length === 0;

let scssSrc = ['src/scss/**/*.scss', '!vars.scss'];

require('./gulpTasks/del')(gulp);
require('./gulpTasks/scss')(gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc);
require('./gulpTasks/js')(gulp, isDev, iff, concat, liveReload, sourcemaps);
require('./gulpTasks/copy')(gulp);
require('./gulpTasks/include')(gulp, isDev, iff, liveReload);
require('./gulpTasks/server')(gulp);
require('./gulpTasks/watch')(gulp, liveReload, scssSrc/*, jsAll, jsPageMeet, ...*/ );

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

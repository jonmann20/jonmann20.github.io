'use strict';

let argv = require('yargs').argv;
let concat = require('gulp-concat');
let gulp = require('gulp');
let iff = require('gulp-if');
let liveReload = require('gulp-livereload'); // TODO: inject into page if isDev
let sourcemaps = require('gulp-sourcemaps');

const isDev = argv._.length === 0;

let scssSrc = ['src/scss/**/*.scss', '!vars.scss'];

require('./gulp_tasks/del')(gulp);
require('./gulp_tasks/scss')(gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc);
require('./gulp_tasks/js')(gulp, isDev, iff, concat, liveReload, sourcemaps);
require('./gulp_tasks/copy')(gulp);
require('./gulp_tasks/include')(gulp, isDev, iff, liveReload);
require('./gulp_tasks/server')(gulp);
require('./gulp_tasks/watch')(gulp, liveReload, scssSrc/*, jsAll, jsPageMeet, ...*/ );

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

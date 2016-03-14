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
require('./gulpTasks/concat')(gulp, concat);
require('./gulpTasks/connect')(gulp);
require('./gulpTasks/copy')(gulp);
require('./gulpTasks/include')(gulp, isDev, iff, liveReload);
require('./gulpTasks/scss')(gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc);
require('./gulpTasks/watch')(gulp, liveReload, /*jsAll, jsPageMeet,*/ scssSrc);

gulp.task('default', [
	'scss',
	'concat',
	'copy',
	'include',
	'connect',
	'watch' // NOTE: keep dependencies up to date
]);

//gulp.task('prd', []);
//gulp.task('srv', []);

//gulp.task('test', [/*'jasmine',*/'jshint', 'scsslint']);

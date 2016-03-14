'use strict';

let argv = require('yargs').argv;
let concat = require('gulp-concat');
let gulp = require('gulp');
let iff = require('gulp-if');
let liveReload = require('gulp-livereload');
let sourcemaps = require('gulp-sourcemaps');

const isDev = argv._.length === 0;

let scssSrc = ['src/scss/**/*.scss', '!vars.scss'];

require('./gulpTasks/del')(gulp);
require('./gulpTasks/concat')(gulp, concat);
require('./gulpTasks/connect')(gulp);
require('./gulpTasks/copy')(gulp);
require('./gulpTasks/include')(gulp);
require('./gulpTasks/scss')(gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc);

gulp.task('default', [
	'scss',
	'concat',
	'copy',
	'include',
	'connect'
	//'watch'
]);

//gulp.task('prd', []);
//gulp.task('srv', []);

//gulp.task('test', [/*'jasmine',*/'jshint', 'scsslint']);

'use strict';

const concat = require('gulp-concat'),
	gulp = require('gulp'),
	iff = require('gulp-if'),
	sourcemaps = require('gulp-sourcemaps'),
	isDev = process.argv.length === 2,
	replace = require('gulp-replace'),
	fs = require('fs');

require('./gulp_tasks/copy')(gulp);
require('./gulp_tasks/del')(gulp);
require('./gulp_tasks/include')(gulp, isDev, iff);
require('./gulp_tasks/js')(gulp, isDev, iff, concat, sourcemaps, replace, fs);
require('./gulp_tasks/scss')(gulp, isDev, iff, concat, sourcemaps, replace, fs);
require('./gulp_tasks/server')(gulp);
require('./gulp_tasks/watch')(gulp);

gulp.task('default', gulp.series(
	gulp.parallel('scss', 'js', 'copy', 'include'/*, 'bundle:icons'*/),
	gulp.parallel('srv', 'watch')
));

gulp.task('test', gulp.parallel('scss-lint', 'jscs', 'jshint'));

gulp.task('prd', gulp.series(
	gulp.parallel('scss', 'test', 'js', 'copy', 'include'),
	gulp.series('bundle:icons', 'js:minifyBundle', 'css:inline', 'js:inlineIndex', 'html:minifyIndex')
));
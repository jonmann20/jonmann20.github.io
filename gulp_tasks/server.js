'use strict';

module.exports = gulp =>
	gulp.task('srv', done => {
		require('gulp-connect').server({root: './'});
		done();
	});
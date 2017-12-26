'use strict';

module.exports = gulp =>
	gulp.task('srv', done => {
		require('gulp-connect').server({
			root: './',
			host: '0.0.0.0'
		});
		done();
	});
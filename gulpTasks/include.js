'use strict';

module.exports = (gulp) => {
	var fileInclude = require('gulp-file-include');

	return (() => {
		gulp.task('include', () => {
			gulp.src(['src/**/*.html']).
				pipe(fileInclude({
					prefix: '@@',
					basepath: '@file'
				})).
				pipe(gulp.dest('./'));
		});
	})();
};

'use strict';

module.exports = (gulp, isDev, iff, liveReload) => {
	var fileInclude = require('gulp-file-include');

	return (() => {
		gulp.task('include', () => {
			return gulp.src(['src/**/*.html']).
				pipe(fileInclude({
					prefix: '@@',
					basepath: '@file'
				})).
				pipe(gulp.dest('./')).
				pipe(iff(isDev, liveReload()));
		});
	})();
};

'use strict';

module.exports = (gulp) => {
	return (() => {
		gulp.task('copy', () => {
			return gulp.src(['src/**', '!src/**/*.html', '!src/scss/**', '!src/scss']).
				pipe(gulp.dest('./'));
		});
	})();
};

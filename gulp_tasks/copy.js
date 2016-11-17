'use strict';

module.exports = (gulp) => {
	return (() => {
		gulp.task('copy', () => {
			return gulp.src([
					'src/**',
					'!src/**/*.html',
					'!src/scss/**',
					'!src/scss',
					'!src/js/models',
					'!src/js/models/**',
					'!src/js/util.js',
					'!src/js/main.js',
					'!src/js/routing.js',
					'!src/js/ballPit.js',
					'!src/js/stars.js'
				]).
				pipe(gulp.dest('./'));
		});
	})();
};

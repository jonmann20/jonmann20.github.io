'use strict';

module.exports = (gulp) => {
	return (() => {
		gulp.task('copy', () => {
			return gulp.src([
					'src/**',
					'!src/**/*.html',
					'!src/scss/**',
					'!src/scss',
					'!src/js/controllers',
					'!src/js/controllers/**',
					'!src/js/util.js',
					'!src/js/main.js',
					'!src/js/router.js',
					'!src/js/ballPit.js',
					'!src/js/stars.js',
					'!src/js/list-carousel.js'
				]).
				pipe(gulp.dest('./'));
		});
	})();
};

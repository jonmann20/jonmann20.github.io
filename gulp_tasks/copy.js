'use strict';

module.exports = gulp =>
	gulp.task('copy', () =>
		gulp.src([
			'src/**',
			'!src/elts',
			'!src/elts/**',
			'!src/scss',
			'!src/scss/**',
			'!src/js',
			'!src/js/controllers',
			'!src/js/controllers/**',
			'!src/js/util.js',
			'!src/js/main.js',
			'!src/js/router.js',
			'!src/js/ballPit.js',
			'!src/js/stars.js',
			'!src/js/listCarousel.js',
			'!src/js/analytics.js',
			'!src/js/clientSideLogging.js',
			'!src/js/sw.js'
		]).
		pipe(gulp.dest('./'))
	);
'use strict';

module.exports = (gulp, liveReload, /*jsAll, jsPageMeet,*/ scssSrc) => {
	let del = require('del');

	return (() => {
		// NOTE: keep dependencies up to date with 'default' task
		gulp.task('watch', () => {
			//gulp.watch('clientSrc/fonts/**/*.{eot,svg,ttf,woff}', ['copy:fonts']);
			gulp.watch('src/**/*.html', gulp.series('include')); // TODO: jshint:html
			//gulp.watch('clientSrc/img/**/*.{png,jpg,gif,ico,svg}', ['copy:img']);
			//gulp.watch(jsAll, ['jsAll', 'jshint', 'jscs']); // TODO: jasmine:client
			//gulp.watch(jsPageMeet, ['jsPageMeet', 'jshint', 'jscs']);  // TODO: jasmine:client
			gulp.watch(scssSrc, gulp.series('scss'/*, 'scsslint'*/));

			liveReload.listen();
		});
	})();
};

'use strict';

module.exports = (gulp) => {
	let connect = require('gulp-connect'); // NOTE: >2.3.1 listing directory bug

	return (() => {
		gulp.task('connect', ['scss', 'concat', 'copy', 'include'], () => {
		  connect.server({
		  	root: './'
		  });
		});
	})();
};

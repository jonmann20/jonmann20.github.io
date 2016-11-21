'use strict';

module.exports = (gulp) => {
	const liveServer = require('gulp-live-server');

	return (() => {
		gulp.task('server', () => {
			const server = liveServer.static('./', 8080);
			server.start();
		});
	})();
};
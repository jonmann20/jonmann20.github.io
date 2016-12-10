'use strict';

module.exports = (gulp) => {
	const liveServer = require('gulp-live-server'),
		server = liveServer.static('./', 8080);

	return (() => {
		gulp.task('srv', () => {
			server.start();
		});
	})();
};
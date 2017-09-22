'use strict';

module.exports = {
	cmd: (app, args) => {
		return new Promise((resolve, reject) => {
			require('child_process').spawn(app, args, {stdio: 'inherit'})
				.on('exit', code => {
					console.log('Done with exit code', code);
					resolve();
				});
		});
	}
};
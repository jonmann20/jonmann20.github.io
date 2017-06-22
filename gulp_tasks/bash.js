'use strict';

function onStdout(data) {
	process.stdout.write(data);
}

function onStderr(data) {
	process.stderr.write(data);
}

function onClose(code) {
	console.log('Done with exit code', code);
}

function onExit(code) {
	console.log('Done with exit code', code);
}

module.exports = {
	npmBin: 'node_modules/.bin/',
	spawn: require('child_process').spawn,
	cmd: (app, args) => {
		module.exports
			.spawn(app, args, {stdio: 'inherit'})
			.on('exit', onExit);
	},
	setup: child => {
		child.stdout.setEncoding('utf8');
		child.stderr.setEncoding('utf8');
		child.stdout.on('data', onStdout);
		child.stderr.on('data', onStderr);
		child.on('close', onClose);
		child.on('exit', onExit);
	}
};
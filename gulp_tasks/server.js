import isDev from './env';
import transformBareModules from 'express-transform-bare-module-specifiers';

const express = require('express');
const livereload = require('easy-livereload');
const path = require('path');

srv.description = 'Local server';
export default function srv(done) {
	const server = express();

	const livereloadPort = process.env.LIVERELOAD_PORT || 35729;
	console.log(`using port ${livereloadPort} for livereload`);
	server.use(livereload({
		watchDirs: [path.join(__dirname, '../')],
		port: livereloadPort
	}));

	if(isDev) {
		server.use('*', transformBareModules()); //{rootDir: `${__dirname}/../`}
		server.use(express.static(`${__dirname}/../`));
		server.get('/', (_, res) => res.sendFile(`${__dirname}/../index.html`));
	}
	else {
		server.use(express.static(`${__dirname}/../dist/`));
		server.get('/', (_, res) => res.sendFile(`${__dirname}/../dist/index.html`));
	}

	const port = process.env.PORT || 8082;
	console.log(`using port ${port}`);
	server.listen(port);

	done();
}
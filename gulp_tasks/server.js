import isDev from './env';
import transformBareModules from 'express-transform-bare-module-specifiers';

const express = require('express');

srv.description = 'Local server';
export default function srv(done) {
	const server = express();

	if(isDev) {
		server.use('*', transformBareModules()); //{rootDir: `${__dirname}/../`}
		server.use(express.static(`${__dirname}/../`));
		server.get('/', (_, res) => res.sendFile(`${__dirname}/../index.html`));
	}
	else {
		server.use(express.static(`${__dirname}/../dist/`));
		server.get('/', (_, res) => res.sendFile(`${__dirname}/../dist/index.html`));
	}

	const port = process.env.PORT || 8080;
	console.log(`using port ${port}`);
	server.listen(port);

	done();
}
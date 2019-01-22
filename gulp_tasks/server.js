//import isDev from './env';
import transformBareModules from 'express-transform-bare-module-specifiers';

const express = require('express');

srv.description = 'Local server';
export default function srv(done) {
	const server = express();
	server.use('*', transformBareModules()); //{rootDir: `${__dirname}/../`}

	// console.log(isDev);

	server.use(express.static(`${__dirname}/../`));
	server.get('/', (_, res) => res.sendFile(`${__dirname}/../index.html`));

	const port = process.env.PORT || 8080;
	console.log(`using port ${port}`);
	server.listen(port);

	done();
}
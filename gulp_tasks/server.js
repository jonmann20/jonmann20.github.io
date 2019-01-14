const express = require('express');
import transformBareModules from 'express-transform-bare-module-specifiers';

srv.description = 'Local server';
export default function srv(done) {
	const server = express();

	server.use('*', transformBareModules(// {
		// rootDir: `${__dirname}/../`
		// }
	));
	server.use(express.static(`${__dirname}/../`));
	server.get('/', (_, res) => res.sendFile(`${__dirname}/../index.html`));

	const port = process.env.PORT || 8080;
	console.log(`using port ${port}`);
	server.listen(port);

	done();
}
import gulp from 'gulp';

import {copy} from './gulp_tasks/copy';
import {del} from './gulp_tasks/del';
import {htmlBundleIcons, htmlMinify} from './gulp_tasks/html';
import {js, eslint, jsInline, jsMinifyBundle} from './gulp_tasks/js';
import {scss, scssLint, cssInline} from './gulp_tasks/scss';
import {srv} from './gulp_tasks/server';
import {watch} from './gulp_tasks/watch';

const test = gulp.parallel(scssLint, eslint);
test.description = 'Lint SCSS and JS files';

// TODO: add analytics.js and clientSideLogging.js
const prd = gulp.series(
	scss, /*test,*/  // NOTE: running test in parallel w/JS was causing bugs
	gulp.parallel(js, copy/*, htmlBundleIcons*/),
	gulp.series(
		gulp.parallel(jsMinifyBundle, cssInline),
		gulp.series(jsInline, htmlMinify)
	)
);
prd.description = 'Build files for production';

export {
	test,
	prd,
	srv,
	scss,
	scssLint,
	copy,
	del,
	js,
	eslint
};

const dev = gulp.parallel(
	gulp.series(scss, js, copy /*, htmlBundleIcons */),
	gulp.series(srv, watch)
);
dev.description = 'Build files and run server';
// dev.flags = {
// 	'--foo': 'A description of the foo flag'
// };

export default dev;
import {series, parallel} from 'gulp';
import del from './gulp_tasks/del';
import copy from './gulp_tasks/copy';
import {bundleComponents, prdIndex, htmlMinify} from './gulp_tasks/html';
//import {cssLint, cssInline} from './gulp_tasks/css';
import {js, eslint, /* jsInline, jsInlineIndex2,*/ jsMinifyBundles} from './gulp_tasks/js';
import srv from './gulp_tasks/server';

const test = parallel(/*htmlLint, cssLint,*/ eslint);
test.description = 'Lint SCSS and JS files';

const dev = parallel(js, srv);
dev.description = 'Build files and run server';

const prd = series(
	test, // NOTE: running test in parallel w/JS was causing bugs
	js,
	parallel(copy, bundleComponents),
	series(/*cssInline, jsInline, jsInlineIndex2,*/ prdIndex, jsMinifyBundles, htmlMinify)
);
prd.description = 'Build files for production';

export {
	del,
	test,
	prd,
	srv
};

export default dev;
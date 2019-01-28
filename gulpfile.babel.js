import {series, parallel} from 'gulp';
import del from './gulp_tasks/del';
import copy from './gulp_tasks/copy';
import {bundleComponents, prdIndex, htmlMinify} from './gulp_tasks/html';
//import {cssLint, cssInline} from './gulp_tasks/css';
import {eslint, jsServiceWorker, jsPrd, jsInlineIndex, jsMinifyBundles} from './gulp_tasks/js';
import srv from './gulp_tasks/server';

const test = parallel(/*htmlLint, cssLint,*/ eslint);
test.description = 'Lint SCSS and JS files';

const prd = series(
	parallel(test, jsServiceWorker, jsPrd, copy, bundleComponents),
	series(/*cssInline*/ prdIndex, jsInlineIndex, jsMinifyBundles, htmlMinify)
);
prd.description = 'Build files for production';

export {
	del,
	test,
	prd,
	srv
};

export default srv;
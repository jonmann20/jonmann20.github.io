import {src, dest} from 'gulp';

copy.description = 'Copy files from `src` to `/`';
export default function copy() {
	return src('src/**').pipe(dest('./'));
}
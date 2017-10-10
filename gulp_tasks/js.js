'use strict';
/* eslint indent: 0 */

module.exports = (gulp, isDev, iff, concat, sourcemaps, replace, fs) => {
	const babel = require('gulp-babel'),
		uglify = require('gulp-uglify-es').default,
		eslint = require('gulp-eslint'),
		gamesCommonJs = [
			'src/games/common/js/GameEngine.js',
			'src/games/common/js/GameSave.js',
			'src/games/common/js/GameInput.js',
			'src/games/common/js/GameUtils.js',
			'src/games/common/js/physics/SAT.js',
			'src/games/common/js/graphics/GameGraphics.js',
			'src/games/common/js/view/GameView.js',
			'src/games/common/js/view/TitleView.js',
			'src/games/common/js/view/GameSaveView.js'
		],
		lints = [
			'src/js/**/*.js',
			'gulpfile.js',
			'gulp_tasks/**/*.js',
			'!src/js/analytics.js'
		],
		presets = [
			['env', {
				targets: {
					browsers: [
						'last 2 Chrome versions',
						'last 2 Firefox versions',
						'last 2 Edge versions',
						'last 2 Safari versions',
						'last 2 iOS versions',
						'last 2 ChromeAndroid versions'
					]
				}
			}]
		],
		handleErr = function(e) {
			console.log(`caught error: ${e}`);
			this.emit('end');
		},
		inline = (src, filename, dest) => {
			const cond = `<script src="${filename}">`;
			const file = `${__dirname}/..${filename}`;

			return gulp.src(src).
				pipe(replace(cond, () => {
					const styles = fs.readFileSync(file, 'utf8');
					return `<script>${styles}`;
				})).
				pipe(gulp.dest(dest));
		};

	return (() => {
		gulp.task('js:master', () =>
			gulp.src([
				'src/js/util.js',
				'src/js/controllers/*.js',
				'src/js/router.js',
				'src/js/main.js'
			]).
			pipe(iff(isDev, sourcemaps.init())).
			pipe(concat('master.js')).
			pipe(iff(!isDev, babel({presets: presets}).on('error', handleErr))).
			pipe(iff(!isDev, uglify())).
			pipe(iff(isDev, sourcemaps.write())).
			pipe(gulp.dest('assets')));

		gulp.task('js:pageDormanticide', () =>
			gulp.src(gamesCommonJs.concat([
				'src/games/dormanticide/js/view/OverworldView.js',
				'src/games/dormanticide/js/view/BattleView.js',
				'src/games/dormanticide/js/dormant/Dormant.js',
				'src/games/dormanticide/js/dormant/FightAction.js',
				'src/games/dormanticide/js/main.js'
			])).
			pipe(iff(isDev, sourcemaps.init())).
			pipe(concat('pageDormanticide.js')).
			// NOTE: babel was causing page to break (due to SAT.js)
			//pipe(iff(!isDev, babel({presets: presets}).on('error', handleErr))).
			pipe(iff(!isDev, uglify())).
			pipe(iff(isDev, sourcemaps.write())).
			pipe(gulp.dest('assets')));

		gulp.task('js:pageVamp', () =>
			gulp.src(gamesCommonJs.concat([
				'src/games/vamp/js/view/LevelView.js',
				'src/games/vamp/js/level/level1.js',
				'src/games/vamp/js/vamp.js',
				'src/games/vamp/js/main.js'
			])).
			pipe(iff(isDev, sourcemaps.init())).
			pipe(concat('pageVamp.js')).
			// NOTE: babel was causing page to break (due to SAT.js)
			//pipe(iff(!isDev, babel({presets: presets}).on('error', handleErr))).
			pipe(iff(!isDev, uglify())).
			pipe(iff(isDev, sourcemaps.write())).
			pipe(gulp.dest('assets')));

		gulp.task('js:other', () =>
			gulp.src([
				'src/js/ballPit.js',
				'src/js/stars.js',
				'src/js/listCarousel.js'
			]).
			pipe(iff(isDev, sourcemaps.init())).
			pipe(iff(!isDev, babel({presets: presets}).on('error', handleErr))).
			pipe(iff(!isDev, uglify())).
			pipe(iff(isDev, sourcemaps.write())).
			pipe(gulp.dest('assets')));

		// gulp.task('js:serviceWorker', () =>
		// 	gulp.src('src/js/sw.js').
		// 	pipe(replace('const CACHE_VERSION = 1;', () => {
		// 		return `const CACHE_VERSION = ${new Date().getTime()};`;
		// 	})).
		// 	pipe(gulp.dest('./')));

		gulp.task('eslint', () =>
			gulp.src(lints).
			pipe(eslint('.eslintrc.js')).
			pipe(eslint.format()).
			pipe(eslint.failAfterError()));

		gulp.task('js:minifyBundle', () =>
			gulp.src('assets/icons.bundle.js').
			pipe(uglify({
				// https://github.com/mishoo/UglifyJS2/issues/1753
				mangle: {
					safari10: true
				}
			})).
			pipe(gulp.dest('assets')));

		gulp.task('js:inlineIndex', () => inline('index.html', '/assets/master.js', './'));
		// https://github.com/webcomponents/webcomponentsjs/issues/801
		//gulp.task('js:inlineIndex2', () => inline('index.html', '/bower_components/webcomponentsjs/webcomponents-loader.js', './'));
		gulp.task('js:inlineDormanticide', () => inline('games/dormanticide/index.html', '/assets/pageDormanticide.js', './games/dormanticide'));
		gulp.task('js:inlineVamp', () => inline('games/vamp/index.html', '/assets/pageVamp.js', './games/vamp'));

		gulp.task('js:inline', gulp.parallel('js:inlineIndex', 'js:inlineDormanticide', 'js:inlineVamp'));

		gulp.task('js', gulp.parallel(
			'js:master',
			'js:pageDormanticide',
			'js:pageVamp',
			'js:other'//,
			//'js:serviceWorker'
		));
	})();
};
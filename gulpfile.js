'use strict';

let argv = require('yargs').argv;
let concat = require('gulp-concat');
let gulp = require('gulp');
let iff = require('gulp-if');
let liveReload = require('gulp-livereload');
let sourcemaps = require('gulp-sourcemaps');

const isDev = argv._.length === 0;

let scssSrc = ['src/scss/**/*.scss', '!vars.scss'];

require('./gulpTasks/scss')(gulp, isDev, iff, concat, liveReload, sourcemaps, scssSrc);

// TODO: sourcemap concat
let gamesCommonJs = [
	'src/games/common/js/GameEngine.js',
	'src/games/common/js/GameSave.js',
	'src/games/common/js/GameInput.js',
	'src/games/common/js/GameUtils.js',
	'src/games/common/js/physics/SAT.js',
	'src/games/common/js/graphics/GameGraphics.js',
	'src/games/common/js/view/GameView.js',
	'src/games/common/js/view/TitleView.js',
	'src/games/common/js/view/GameSaveView.js'
];

gulp.task('concat:masterJs', () => {
	return gulp.src([
				'src/js/plugins/sammy.js',
				'src/js/utils.js',
				'src/js/models/*.js',
				'src/js/routing.js',
				'src/js/main.js'
			]).
			pipe(gulp.dest('assets/master.js'));
});

gulp.task('concat:gamesCommonJs', () => {
	return gulp.src(gamesCommonJs).
			pipe(gulp.dest('assets/gamesCommon.js'));
});

gulp.task('concat:pageDormanticide', () => {
	/*return gulp.src(gamesCommonJs.concat([
				'src/games/dormanticide/js/view/OverworldView.js',
				'src/games/dormanticide/js/view/BattleView.js',
				'src/games/dormanticide/js/dormant/Dormant.js',
				'src/games/dormanticide/js/dormant/FightAction.js',
				'src/games/dormanticide/js/main.js'
			]).
			pipe(gulp.dest('assets/pageDormanticide.js'));*/
});

gulp.task('concat:pageVamp', () => {
	/*return gulp.src(gamesCommonJs.concat([
				'src/games/vamp/js/view/LevelView.js',
				'src/games/vamp/js/level/level1.js',
				'src/games/vamp/js/vamp.js',
				'src/games/vamp/js/main.js'
			]).
			pipe(gulp.dest('assets/pageVamp.js'));*/
});

gulp.task('concat:masterCss', () => {
	return gulp.src([
				'assets/css/normalize.css',
				'assets/css/base.css',
				'assets/css/layout.css',
				'assets/css/state/home.css',
				'assets/css/state/games.css',
				'assets/css/state/music.css',
				'assets/css/state/playground.css',
				'assets/css/state/portfolio.css',
				'assets/css/state/responsive.css'
			]).
			pipe(gulp.dest('assets/master.css'));
});

gulp.task('concat', ['concat:masterJs', 'concat:gamesCommonJs', 'concat:pageDormanticide', 'concat:pageVamp', 'concat:masterCss']);

gulp.task('copy', () => {
	return gulp.src(['**', '!**/*.html', '!scss/**']).
		pipe(gulp.dest('./'));
});


gulp.task('default', [
	'scss',
	'concat',
	'copy',
	//includereplace
	//'nodemon',//connect:dev
	//'watch'
]);

//gulp.task('prd', []);
//gulp.task('srv', []);

//gulp.task('test', [/*'jasmine',*/'jshint', 'scsslint']);

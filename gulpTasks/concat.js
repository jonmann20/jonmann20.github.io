'use strict';

module.exports = (gulp, concat) => {
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

	return (() => {
		gulp.task('concat:masterJs', () => {
			return gulp.src([
				'src/js/plugins/sammy.js',
				'src/js/utils.js',
				'src/js/models/*.js',
				'src/js/routing.js',
				'src/js/main.js'
			]).
			pipe(concat('master.js')).
			pipe(gulp.dest('assets'));
		});

		gulp.task('concat:gamesCommonJs', () => {
			return gulp.src(gamesCommonJs).
				pipe(concat('gamesCommon.js')).
				pipe(gulp.dest('assets'));
		});

		gulp.task('concat:pageDormanticide', () => {
			/*return gulp.src(gamesCommonJs.concat([
				'src/games/dormanticide/js/view/OverworldView.js',
				'src/games/dormanticide/js/view/BattleView.js',
				'src/games/dormanticide/js/dormant/Dormant.js',
				'src/games/dormanticide/js/dormant/FightAction.js',
				'src/games/dormanticide/js/main.js'
			]).
			pipe(concat('pageDormanticide.js')).
			pipe(gulp.dest('assets'));*/
		});

		gulp.task('concat:pageVamp', () => {
			/*return gulp.src(gamesCommonJs.concat([
				'src/games/vamp/js/view/LevelView.js',
				'src/games/vamp/js/level/level1.js',
				'src/games/vamp/js/vamp.js',
				'src/games/vamp/js/main.js'
			]).
			pipe(concat('pageVamp.js')).
			pipe(gulp.dest('assets'));*/
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
			pipe(concat('master.css')).
			pipe(gulp.dest('assets'));
		});

		gulp.task('concat', [
			'concat:masterJs',
			'concat:gamesCommonJs',
			'concat:pageDormanticide',
			'concat:pageVamp',
			'concat:masterCss'
		]);
	})();
};

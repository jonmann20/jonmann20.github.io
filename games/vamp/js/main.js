/* globals game */
import GameEngine from '../../common/js/GameEngine';
import {KeyCode} from '../../common/js/GameInput';
import TitleView from '../../common/js/view/TitleView';
import GameSaveView from '../../common/js/view/GameSaveView';

import Vamp from './vamp';
import Level1 from './level/level1';
import LevelView from './view/LevelView';

(() => {
	window.game = new GameEngine();

	let titleView = new TitleView('Vamp: The Great and Powerful', true);
	let saveView = new GameSaveView();

	const vamp = new Vamp();
	const lvl1 = new Level1();
	const lvlView = new LevelView(vamp, lvl1);

	titleView.then(() => {
		game.utils.switchView(saveView);
	});

	saveView.then(key => {
		if(key === KeyCode.ESC) {
			game.utils.switchView(titleView);
		}
		else if(key === KeyCode.ENTER) {
			game.utils.switchView(lvlView);
		}
	});

	game.view = titleView;
})();
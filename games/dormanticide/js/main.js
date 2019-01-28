import GameEngine from '../../common/js/GameEngine';
import TitleView from '../../common/js/view/TitleView';

import OverworldView from './view/OverworldView';
import BattleView from './view/BattleView';
import FightAction from './dormant/FightAction';
import Dormant from './dormant/Dormant';


(() => {
	window.game = new GameEngine();

	let curLvl = 1;

	let titleView = new TitleView('Dormanticide');
	titleView.then(() => {
		game.utils.switchView(overworldView);
	});

	let overworldView = new OverworldView();
	overworldView.then(() => {
		if(curLvl === 1) {
			game.utils.switchView(lvl1);
		}
		else {
			game.utils.switchView(lvl2);
		}
	});

	let actions = [FightAction.TACKLE, FightAction.DRAGONS_BREATH, null, null];

	let malaise = new Dormant('malaise.png', 'MALAISE', 12, 8, 27, actions);
	let erabor = new Dormant('erabor.png', 'ERABOR', 8, 12, 23, actions);

	let lvl1 = new BattleView('#ddd', malaise, erabor);
	lvl1.then(() => {
		++curLvl;
		game.utils.switchView(overworldView);
	});

	let lvl2 = new BattleView('#ddd', malaise, erabor);
	lvl2.then(() => {
		game.utils.switchView(overworldView);
	});

	game.view = titleView;
})();

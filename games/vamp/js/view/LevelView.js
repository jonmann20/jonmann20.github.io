import SAT from '../../../common/js/physics/SAT';

class LevelView {
	constructor(player, curLvl) {
		this.onUpdateSet = false;
		this.onRenderSet = false;

		this.privates = {};
		this.player = player;
		this.curLvl = curLvl;

		this.init();
	}

	then(callback) {
		this.privates.callback = callback;
	}

	init() {

	}

	update() {
		this.curLvl.update();
		this.player.update();

		this._checkCollision();
	}

	onUpdate(callback) {
		this.onUpdateSet = true;
		this.onUpdate = callback;
	}

	render() {
		this.curLvl.render();
		this.player.render();
	}

	onRender(callback) {
		this.onRenderSet = true;
		this.onRender = callback;
	}

	_checkCollision() {
		if(this.player.invincible) {
			if(this.player.invincibleTimer-- === 0) {
				this.player.invincible = false;
				this.player.invincibleTimer = 120;
			}

			return;
		}

		for(let i = 0; i < this.curLvl.projectiles.length; ++i) {
			const collided = SAT.testPolygonPolygon(this.player, this.curLvl.projectiles[i]);
			if(collided) {
				--this.player.hp;
				this.player.invincible = true;
				break;
			}
		}
	}
}

export default LevelView;
/* globals game, ctx */
import SAT from '../../common/js/physics/SAT';
import {KeyCode} from '../../common/js/GameInput';

class Vamp {
	constructor() {
		this.speed = 4;
		this.w = 40;
		this.h = 40;
		this.hp = 3;
		this.invincible = false;
		this.invincibleTimer = 120;
		this.dead = false;

		Object.assign(this, new SAT.Box(new SAT.Vector(0, 0), this.w, this.h).toPolygon());
	}

	update() {
		// horizontal
		if(game.input.keysDown[KeyCode.RIGHT]) {
			this.pos.x += this.speed;
		}
		else if(game.input.keysDown[KeyCode.LEFT]) {
			this.pos.x -= this.speed;
		}

		// vertical
		if(game.input.keysDown[KeyCode.UP]) {
			this.pos.y -= this.speed;
		}
		else if(game.input.keysDown[KeyCode.DOWN]) {
			this.pos.y += this.speed;
		}

		if(this.hp <= 0 && !this.dead) {
			this.dead = true;
			alert('You died');
			location.reload();
		}
	}

	render() {
		if(this.dead) {
			return;
		}

		// body
		let doDraw = true;
		if(this.invincible) {
			const t = this.invincibleTimer % 30;
			if(t >= 0 && t < 15) {
				doDraw = false;
			}
		}

		if(doDraw) {
			ctx.fillStyle = 'yellow';
			ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);
		}

		// health
		ctx.fillStyle = 'red';
		for(let i = 0; i < this.hp; ++i) {
			ctx.fillRect(this.pos.x - 10 + i * 20, this.pos.y - 20, 20, 10);
		}
	}
}

export default Vamp;
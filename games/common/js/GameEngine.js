import {GameInput} from './GameInput';
import GameGraphics from './graphics/GameGraphics';
import GameView from './view/GameView';
import {GameUtils} from './GameUtils';

class GameEngine {
	constructor() {
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);

		this.updateInterval = setInterval(this.update, 1000 / 60);
		this.renderRAF = requestAnimationFrame(this.render);

		this.onUpdateSet = false;
		this.onRenderSet = false;

		// back button
		let backBtn = document.createElement('a');
		backBtn.href = '/#games';
		backBtn.innerText = 'Back';
		backBtn.className = 'btn-back';
		document.body.appendChild(backBtn);

		// canvas wrap
		let wrap = document.createElement('div');
		wrap.className = 'canvas-wrap';

		// canvas
		window.canvas = document.createElement('canvas');
		canvas.setAttribute('width', 16 * 63);
		canvas.setAttribute('height', 9 * 63);
		wrap.appendChild(canvas);
		document.body.appendChild(wrap);

		window.ctx = canvas.getContext('2d');

		this.input = new GameInput();
		this.graphics = new GameGraphics();
		this.view = new GameView();
		this.utils = new GameUtils(this);
	}

	update() {
		this.view.update();

		if(this.onUpdateSet) {
			this.onUpdate();
		}
	}

	render() {
		this.renderRAF = requestAnimationFrame(this.render);
		this.view.render();

		if(this.onRenderSet) {
			this.onRender();
		}
	}

	onUpdate(callback) {
		this.onUpdateSet = true;
		this.onUpdate = callback;
	}

	onRender(callback) {
		this.onRenderSet = true;
		this.onRender = callback;
	}

	stop() {
		clearInterval(this.updateInterval);
		cancelAnimationFrame(this.renderRAF);
	}
}

export default GameEngine;
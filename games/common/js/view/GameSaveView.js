import GameSave from '../GameSave';
import {KeyCode} from '../GameInput';

class GameSaveView {
	constructor() {
		this.title = 'Select a save slot';
		this.storage = new GameSave();
		this.list = this.storage.getList();

		this.privates = {};
		this.init();
	}

	then(callback) {
		this.privates.callback = callback;
	}

	init() {
		this.arrow = {
			img: '>>',
			slot: 0,
			x: canvas.width / 2 - ctx.measureText(this.list[0]).width / 2 - 60,    // TODO: make instance var??
			y: 200
		};
	}

	update() {
		if(game.input.lastKeyDown === KeyCode.ESC) {
			game.input.lastKeyDown = KeyCode.EMPTY;
			this.privates.callback(KeyCode.ESC);
		}
		else if(game.input.lastKeyDown === KeyCode.ENTER) {
			game.input.lastKeyDown = KeyCode.EMPTY;

			const date = new Date();
			const m = date.getMonth() + 1;
			const d = date.getDate();
			const y = date.getFullYear();
			const t = date.toLocaleTimeString();

			this.storage.save(this.arrow.slot, `${m}/${d}/${y} ${t}`);
			this.privates.callback(KeyCode.ENTER);
		}
		else if(game.input.lastKeyDown === KeyCode.DELETE) {
			game.input.lastKeyDown = KeyCode.EMPTY;

			this.list = this.storage.erase(this.arrow.slot);
		}
		else if(this.arrow.slot !== 2 && game.input.lastKeyDown === KeyCode.DOWN) {
			game.input.lastKeyDown = KeyCode.EMPTY;

			++this.arrow.slot;
			this.arrow.x = canvas.width / 2 - ctx.measureText(this.list[this.arrow.slot]).width / 2 - 60;
			this.arrow.y += 80;
		}
		else if(this.arrow.slot !== 0 && game.input.lastKeyDown === KeyCode.UP) {
			game.input.lastKeyDown = KeyCode.EMPTY;

			--this.arrow.slot;
			this.arrow.x = canvas.width / 2 - ctx.measureText(this.list[this.arrow.slot]).width / 2 - 60;
			this.arrow.y -= 80;
		}
	}

	render() {
		ctx.fillStyle = '#111';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.font = '36px Arial';
		ctx.fillStyle = '#fff';
		ctx.fillText(this.title, canvas.width / 2 - ctx.measureText(this.title).width / 2, 80);

		ctx.font = '24px Arial';

		for(let i = 0; i < this.list.length; ++i) {
			ctx.fillText(this.list[i], canvas.width / 2 - ctx.measureText(this.list[i]).width / 2, 200 + i * 80);
		}

		ctx.fillText(this.arrow.img, this.arrow.x, this.arrow.y);
	}
}

export default GameSaveView;
import {KeyCode} from '../GameInput';

class TitleView {
	constructor(title) {
		this.cta = 'Press Enter';

		this.privates = {
			title: title
		};

		this.init();
	}

	then(callback) {
		this.privates.callback = callback;
	}

	init() {
		this.title = this.privates.title;
	}

	update() {
		if(game.input.lastKeyDown === KeyCode.ENTER) {
			game.input.lastKeyDown = KeyCode.EMPTY;
			this.privates.callback();
		}
	}

	render() {
		ctx.fillStyle = '#000';
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		ctx.font = '36px Arial';
		ctx.fillStyle = '#fff';
		ctx.fillText(this.title, canvas.width / 2 - ctx.measureText(this.title).width / 2, 100);

		ctx.font = '24px Arial';
		ctx.fillText(this.cta, canvas.width / 2 - ctx.measureText(this.cta).width / 2, canvas.height / 2);
	}
}

export default TitleView;
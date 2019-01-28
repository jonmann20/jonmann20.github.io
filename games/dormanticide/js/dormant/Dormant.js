class Dormant {
	constructor(src, name, atk, def, hp, actions, lvl) {
		this.img = new Image();
		this.imgReady = false;
		this.img.onload = () => {
			this.imgReady = true;
		};
		this.img.src = `img/${src}`;

		this.name = name;
		this.atk = atk;
		this.def = def;
		this.initHP = this.hp = hp;
		this.actions = actions;
		this.lvl = (typeof(lvl) !== 'undefined') ? lvl : 1;
		this.xp = 0;
		this.xpNeeded = 50;
	}

	draw(x, y) {
		if(this.imgReady) {
			ctx.drawImage(this.img, x, y, this.img.width, this.img.height);
		}
	}
}

export default Dormant;
'use strict'; // eslint-disable-line
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "BallPit"}] */

class BallPit {
	constructor() {
		this.boundOnRoute = (e) => this.destroy(e.detail);
		addEventListener('route', this.boundOnRoute, {passive: true});

		this.canvas = document.querySelector('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.radius = 16.5;
		this.balls = [];

		this.canvas.width = Util.getMainWidth / 1.5;
		this.canvas.height = this.canvas.width / 2;

		// set up modifications
		this.boundOnNumBalls = (e) => this.onNumBalls(e.target.value);
		this.boundOnSizeBalls = (e) => this.onSizeBalls(e.target.value);
		this.boundOnSpeedBalls = (e) => this.onSpeedBalls(e.target.value);

		document.querySelector('.numBalls').addEventListener('input', this.boundOnNumBalls);
		document.querySelector('.sizeBalls').addEventListener('input', this.boundOnSizeBalls);
		document.querySelector('.speedBalls').addEventListener('input', this.boundOnSpeedBalls);

		// initialize the array of balls
		for(let i = 0; i < 20; ++i) {
			this.balls.push({
				x: Math.floor(Math.random() * (this.canvas.width + 1)),
				y: Math.floor(Math.random() * (this.canvas.height + 1)),
				velocity: {
					x: Math.floor(Math.random() * (-3)),  // [-2, 2]
					y: Math.floor(Math.random() * 7) - 3  // [-3, 3]
				},
				color: this.getRandomColor()
			});
		}

		this.runSim();
	}

	destroy(page) {
		if(page === '#playground/ball-pit') {
			return;
		}

		removeEventListener('route', this.boundOnRoute, {passive: true});
		cancelAnimationFrame(this.animLoop);

		const numBalls = document.querySelector('.numBalls');
		const sizeBalls = document.querySelector('.sizeBalls');
		const speedBalls = document.querySelector('.speedBalls');

		if(numBalls) {
			numBalls.removeEventListener('input', this.boundOnNumBalls);
		}

		if(sizeBalls) {
			sizeBalls.removeEventListener('input', this.boundOnSizeBalls);
		}

		if(speedBalls) {
			speedBalls.removeEventListener('input', this.boundOnSpeedBalls);
		}

		delete window.ballPit;
	}

	update() {
		for(let ball of this.balls) {
			// update position
			ball.x += ball.velocity.x;
			ball.y += ball.velocity.y;

			// detect collisions
			if((ball.x - this.radius) < 0 && ball.velocity.x < 0) {
				ball.velocity.x = -ball.velocity.x;
			}

			if(ball.y >= (this.canvas.height - this.radius) && ball.velocity.y > 0) {
				ball.velocity.y = -ball.velocity.y;
			}

			if(ball.x >= (this.canvas.width - this.radius) && ball.velocity.x > 0) {
				ball.velocity.x = -ball.velocity.x;
			}

			if((ball.y - this.radius) < 0 && ball.velocity.y < 0) {
				ball.velocity.y = -ball.velocity.y;
			}
		}
	}

	render() {
		// draw background
		this.ctx.fillStyle = '#0098ff';
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		// draw balls
		for(const ball of this.balls) {
			this.ctx.fillStyle = ball.color;
			this.ctx.beginPath();
			this.ctx.arc(ball.x, ball.y, this.radius, 0, 2 * Math.PI, false);
			this.ctx.fill();
		}
	}

	runSim() {
		this.update();
		this.render();

		this.animLoop = requestAnimationFrame(() => this.runSim());
	}

	fixArr(num) {
		let i = 0, diff = this.balls.length - num;

		if(diff > 0) {
			for(; i < diff; ++i) {
				this.balls.pop();
			}
		}
		else if(diff < 0) {
			diff = -diff;

			for(; i < diff; ++i) {
				let ball = {						// (max   - min + 1)  + min
					x: Math.floor(Math.random() * (this.canvas.width - 0 + 1)) + 0, // [0, canvas.width]
					y: Math.floor(Math.random() * (this.canvas.height + 1)),        // [0, canvas.height]
					velocity: {
						x: Math.floor(Math.random() * (2 - (-2) + 1)) + (-2),       // [-2, 2]
						y: Math.floor(Math.random() * (3 - (-3) + 1)) + (-3)        // [-3, 3]
					},
					color: this.getRandomColor()
				};

				if(ball.velocity.x === 0) {
					ball.velocity.x = 1;
				}

				if(ball.velocity.y === 0) {
					ball.velocity.y = 1;
				}

				this.balls.push(ball);
			}
		}
	}

	updateUserSpeed(oldSpeed, newSpeed) {
		let originalVx, originalVy;

		for(let ball of this.balls) {
			originalVx = ball.velocity.x / oldSpeed;
			originalVy = ball.velocity.y / oldSpeed;

			ball.velocity.x = originalVx * newSpeed;
			ball.velocity.y = originalVy * newSpeed;
		}
	}

	onNumBalls(num) {
		document.querySelector('.litNumBalls').textContent = num;
		this.fixArr(num);
	}

	onSizeBalls(num) {
		document.querySelector('.litSizeBalls').textContent = num;
		this.radius = num;
	}

	onSpeedBalls(num) {
		this.updateUserSpeed(document.querySelector('.litSpeedBalls').textContent, num);
		document.querySelector('.litSpeedBalls').textContent = num;
	}

	getRandomColor() {
		const letters = '0123456789ABCDEF';
		let color = '#';

		for(let i = 0; i < 6; ++i) {
			color += letters[Math.floor(Math.random() * 16)];
		}

		return color;
	}
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJiYWxsUGl0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFtcImVycm9yXCIsIHtcInZhcnNJZ25vcmVQYXR0ZXJuXCI6IFwiQmFsbFBpdFwifV0gKi9cclxuXHJcbmNsYXNzIEJhbGxQaXQge1xyXG5cdGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5ib3VuZE9uUm91dGUgPSAoZSkgPT4gdGhpcy5kZXN0cm95KGUuZGV0YWlsKTtcclxuXHRcdGFkZEV2ZW50TGlzdGVuZXIoJ3JvdXRlJywgdGhpcy5ib3VuZE9uUm91dGUsIHtwYXNzaXZlOiB0cnVlfSk7XHJcblxyXG5cdFx0dGhpcy5jYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcclxuXHRcdHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHRcdHRoaXMucmFkaXVzID0gMTYuNTtcclxuXHRcdHRoaXMuYmFsbHMgPSBbXTtcclxuXHJcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IFV0aWwuZ2V0TWFpbldpZHRoIC8gMS41O1xyXG5cdFx0dGhpcy5jYW52YXMuaGVpZ2h0ID0gdGhpcy5jYW52YXMud2lkdGggLyAyO1xyXG5cclxuXHRcdC8vIHNldCB1cCBtb2RpZmljYXRpb25zXHJcblx0XHR0aGlzLmJvdW5kT25OdW1CYWxscyA9IChlKSA9PiB0aGlzLm9uTnVtQmFsbHMoZS50YXJnZXQudmFsdWUpO1xyXG5cdFx0dGhpcy5ib3VuZE9uU2l6ZUJhbGxzID0gKGUpID0+IHRoaXMub25TaXplQmFsbHMoZS50YXJnZXQudmFsdWUpO1xyXG5cdFx0dGhpcy5ib3VuZE9uU3BlZWRCYWxscyA9IChlKSA9PiB0aGlzLm9uU3BlZWRCYWxscyhlLnRhcmdldC52YWx1ZSk7XHJcblxyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm51bUJhbGxzJykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmJvdW5kT25OdW1CYWxscyk7XHJcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l6ZUJhbGxzJykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmJvdW5kT25TaXplQmFsbHMpO1xyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNwZWVkQmFsbHMnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuYm91bmRPblNwZWVkQmFsbHMpO1xyXG5cclxuXHRcdC8vIGluaXRpYWxpemUgdGhlIGFycmF5IG9mIGJhbGxzXHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgMjA7ICsraSkge1xyXG5cdFx0XHR0aGlzLmJhbGxzLnB1c2goe1xyXG5cdFx0XHRcdHg6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICh0aGlzLmNhbnZhcy53aWR0aCArIDEpKSxcclxuXHRcdFx0XHR5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5jYW52YXMuaGVpZ2h0ICsgMSkpLFxyXG5cdFx0XHRcdHZlbG9jaXR5OiB7XHJcblx0XHRcdFx0XHR4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoLTMpKSwgIC8vIFstMiwgMl1cclxuXHRcdFx0XHRcdHk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDcpIC0gMyAgLy8gWy0zLCAzXVxyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0Y29sb3I6IHRoaXMuZ2V0UmFuZG9tQ29sb3IoKVxyXG5cdFx0XHR9KTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLnJ1blNpbSgpO1xyXG5cdH1cclxuXHJcblx0ZGVzdHJveShwYWdlKSB7XHJcblx0XHRpZihwYWdlID09PSAnI3BsYXlncm91bmQvYmFsbC1waXQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRyZW1vdmVFdmVudExpc3RlbmVyKCdyb3V0ZScsIHRoaXMuYm91bmRPblJvdXRlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltTG9vcCk7XHJcblxyXG5cdFx0Y29uc3QgbnVtQmFsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubnVtQmFsbHMnKTtcclxuXHRcdGNvbnN0IHNpemVCYWxscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXplQmFsbHMnKTtcclxuXHRcdGNvbnN0IHNwZWVkQmFsbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3BlZWRCYWxscycpO1xyXG5cclxuXHRcdGlmKG51bUJhbGxzKSB7XHJcblx0XHRcdG51bUJhbGxzLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2lucHV0JywgdGhpcy5ib3VuZE9uTnVtQmFsbHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHNpemVCYWxscykge1xyXG5cdFx0XHRzaXplQmFsbHMucmVtb3ZlRXZlbnRMaXN0ZW5lcignaW5wdXQnLCB0aGlzLmJvdW5kT25TaXplQmFsbHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHNwZWVkQmFsbHMpIHtcclxuXHRcdFx0c3BlZWRCYWxscy5yZW1vdmVFdmVudExpc3RlbmVyKCdpbnB1dCcsIHRoaXMuYm91bmRPblNwZWVkQmFsbHMpO1xyXG5cdFx0fVxyXG5cclxuXHRcdGRlbGV0ZSB3aW5kb3cuYmFsbFBpdDtcclxuXHR9XHJcblxyXG5cdHVwZGF0ZSgpIHtcclxuXHRcdGZvcihsZXQgYmFsbCBvZiB0aGlzLmJhbGxzKSB7XHJcblx0XHRcdC8vIHVwZGF0ZSBwb3NpdGlvblxyXG5cdFx0XHRiYWxsLnggKz0gYmFsbC52ZWxvY2l0eS54O1xyXG5cdFx0XHRiYWxsLnkgKz0gYmFsbC52ZWxvY2l0eS55O1xyXG5cclxuXHRcdFx0Ly8gZGV0ZWN0IGNvbGxpc2lvbnNcclxuXHRcdFx0aWYoKGJhbGwueCAtIHRoaXMucmFkaXVzKSA8IDAgJiYgYmFsbC52ZWxvY2l0eS54IDwgMCkge1xyXG5cdFx0XHRcdGJhbGwudmVsb2NpdHkueCA9IC1iYWxsLnZlbG9jaXR5Lng7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKGJhbGwueSA+PSAodGhpcy5jYW52YXMuaGVpZ2h0IC0gdGhpcy5yYWRpdXMpICYmIGJhbGwudmVsb2NpdHkueSA+IDApIHtcclxuXHRcdFx0XHRiYWxsLnZlbG9jaXR5LnkgPSAtYmFsbC52ZWxvY2l0eS55O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZihiYWxsLnggPj0gKHRoaXMuY2FudmFzLndpZHRoIC0gdGhpcy5yYWRpdXMpICYmIGJhbGwudmVsb2NpdHkueCA+IDApIHtcclxuXHRcdFx0XHRiYWxsLnZlbG9jaXR5LnggPSAtYmFsbC52ZWxvY2l0eS54O1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZigoYmFsbC55IC0gdGhpcy5yYWRpdXMpIDwgMCAmJiBiYWxsLnZlbG9jaXR5LnkgPCAwKSB7XHJcblx0XHRcdFx0YmFsbC52ZWxvY2l0eS55ID0gLWJhbGwudmVsb2NpdHkueTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVuZGVyKCkge1xyXG5cdFx0Ly8gZHJhdyBiYWNrZ3JvdW5kXHJcblx0XHR0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzAwOThmZic7XHJcblx0XHR0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuXHJcblx0XHQvLyBkcmF3IGJhbGxzXHJcblx0XHRmb3IoY29uc3QgYmFsbCBvZiB0aGlzLmJhbGxzKSB7XHJcblx0XHRcdHRoaXMuY3R4LmZpbGxTdHlsZSA9IGJhbGwuY29sb3I7XHJcblx0XHRcdHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG5cdFx0XHR0aGlzLmN0eC5hcmMoYmFsbC54LCBiYWxsLnksIHRoaXMucmFkaXVzLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xyXG5cdFx0XHR0aGlzLmN0eC5maWxsKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRydW5TaW0oKSB7XHJcblx0XHR0aGlzLnVwZGF0ZSgpO1xyXG5cdFx0dGhpcy5yZW5kZXIoKTtcclxuXHJcblx0XHR0aGlzLmFuaW1Mb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMucnVuU2ltKCkpO1xyXG5cdH1cclxuXHJcblx0Zml4QXJyKG51bSkge1xyXG5cdFx0bGV0IGkgPSAwLCBkaWZmID0gdGhpcy5iYWxscy5sZW5ndGggLSBudW07XHJcblxyXG5cdFx0aWYoZGlmZiA+IDApIHtcclxuXHRcdFx0Zm9yKDsgaSA8IGRpZmY7ICsraSkge1xyXG5cdFx0XHRcdHRoaXMuYmFsbHMucG9wKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdGVsc2UgaWYoZGlmZiA8IDApIHtcclxuXHRcdFx0ZGlmZiA9IC1kaWZmO1xyXG5cclxuXHRcdFx0Zm9yKDsgaSA8IGRpZmY7ICsraSkge1xyXG5cdFx0XHRcdGxldCBiYWxsID0ge1x0XHRcdFx0XHRcdC8vIChtYXggICAtIG1pbiArIDEpICArIG1pblxyXG5cdFx0XHRcdFx0eDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKHRoaXMuY2FudmFzLndpZHRoIC0gMCArIDEpKSArIDAsIC8vIFswLCBjYW52YXMud2lkdGhdXHJcblx0XHRcdFx0XHR5OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAodGhpcy5jYW52YXMuaGVpZ2h0ICsgMSkpLCAgICAgICAgLy8gWzAsIGNhbnZhcy5oZWlnaHRdXHJcblx0XHRcdFx0XHR2ZWxvY2l0eToge1xyXG5cdFx0XHRcdFx0XHR4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMiAtICgtMikgKyAxKSkgKyAoLTIpLCAgICAgICAvLyBbLTIsIDJdXHJcblx0XHRcdFx0XHRcdHk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgzIC0gKC0zKSArIDEpKSArICgtMykgICAgICAgIC8vIFstMywgM11cclxuXHRcdFx0XHRcdH0sXHJcblx0XHRcdFx0XHRjb2xvcjogdGhpcy5nZXRSYW5kb21Db2xvcigpXHJcblx0XHRcdFx0fTtcclxuXHJcblx0XHRcdFx0aWYoYmFsbC52ZWxvY2l0eS54ID09PSAwKSB7XHJcblx0XHRcdFx0XHRiYWxsLnZlbG9jaXR5LnggPSAxO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0aWYoYmFsbC52ZWxvY2l0eS55ID09PSAwKSB7XHJcblx0XHRcdFx0XHRiYWxsLnZlbG9jaXR5LnkgPSAxO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0dGhpcy5iYWxscy5wdXNoKGJhbGwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHR1cGRhdGVVc2VyU3BlZWQob2xkU3BlZWQsIG5ld1NwZWVkKSB7XHJcblx0XHRsZXQgb3JpZ2luYWxWeCwgb3JpZ2luYWxWeTtcclxuXHJcblx0XHRmb3IobGV0IGJhbGwgb2YgdGhpcy5iYWxscykge1xyXG5cdFx0XHRvcmlnaW5hbFZ4ID0gYmFsbC52ZWxvY2l0eS54IC8gb2xkU3BlZWQ7XHJcblx0XHRcdG9yaWdpbmFsVnkgPSBiYWxsLnZlbG9jaXR5LnkgLyBvbGRTcGVlZDtcclxuXHJcblx0XHRcdGJhbGwudmVsb2NpdHkueCA9IG9yaWdpbmFsVnggKiBuZXdTcGVlZDtcclxuXHRcdFx0YmFsbC52ZWxvY2l0eS55ID0gb3JpZ2luYWxWeSAqIG5ld1NwZWVkO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0b25OdW1CYWxscyhudW0pIHtcclxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXROdW1CYWxscycpLnRleHRDb250ZW50ID0gbnVtO1xyXG5cdFx0dGhpcy5maXhBcnIobnVtKTtcclxuXHR9XHJcblxyXG5cdG9uU2l6ZUJhbGxzKG51bSkge1xyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpdFNpemVCYWxscycpLnRleHRDb250ZW50ID0gbnVtO1xyXG5cdFx0dGhpcy5yYWRpdXMgPSBudW07XHJcblx0fVxyXG5cclxuXHRvblNwZWVkQmFsbHMobnVtKSB7XHJcblx0XHR0aGlzLnVwZGF0ZVVzZXJTcGVlZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGl0U3BlZWRCYWxscycpLnRleHRDb250ZW50LCBudW0pO1xyXG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpdFNwZWVkQmFsbHMnKS50ZXh0Q29udGVudCA9IG51bTtcclxuXHR9XHJcblxyXG5cdGdldFJhbmRvbUNvbG9yKCkge1xyXG5cdFx0Y29uc3QgbGV0dGVycyA9ICcwMTIzNDU2Nzg5QUJDREVGJztcclxuXHRcdGxldCBjb2xvciA9ICcjJztcclxuXHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgNjsgKytpKSB7XHJcblx0XHRcdGNvbG9yICs9IGxldHRlcnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTYpXTtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4gY29sb3I7XHJcblx0fVxyXG59Il0sImZpbGUiOiJiYWxsUGl0LmpzIn0=

'use strict'; // eslint-disable-line
/* eslint no-unused-vars: ["error", {"varsIgnorePattern": "StarryBg"}] */
/* eslint camelcase: 0 */

class StarryBg {
	constructor() {
		this.boundOnRoute = (e) => this.destroy(e.detail);
		addEventListener('route', this.boundOnRoute, {passive: true});

		const color = document.querySelector('input[type=radio]:checked').value;
		this.initStar(color);

		let radios = Array.from(document.querySelectorAll('input[type=radio]'));
		for(let radio of radios) {
			radio.addEventListener('click', e => this.onColorChange(e.target.value), {passive: true});
		}

		// TODO: not working in Chrome or FF??
		// document.getElementById('custom').addEventListener('change', this.onColorChange);
	}

	destroy(page) {
		if(page === '#playground/starry-background') {
			return;
		}

		removeEventListener('route', this.boundOnRoute, {passive: true});
		cancelAnimationFrame(this.animLoop);

		this.starBg.destroy();

		let radios = Array.from(document.querySelectorAll('input[type=radio]'));
		for(let radio of radios) {
			radio.removeEventListener('click', e => this.onColorChange(e.target.value), {passive: true});
		}

		//document.getElementById('custom').removeEventListener('change', this.onColorChange);
		delete window.starryBg;
	}

	initStar(color) {
		this.starBg = new StarBg({
			elt: document.getElementById('starry-canvas'),
			window_width: Util.getMainWidth,
			window_height: 400,
			star_color: color,
			star_count: 1300,
			star_depth: 330,
			container: 'starry-canvas'
		});
	}

	onColorChange(color) {
		this.starBg.destroy();
		delete this.starBg;

		this.initStar(color);
	}
}

class StarBg {
	constructor(p) {
		this.windowBg = '#000';
		this.starColor = p.star_color;
		this.fov = p.star_depth;
		this.SCREEN_WIDTH = p.window_width;
		this.SCREEN_HEIGHT = p.window_height;
		this.HALF_WIDTH = this.SCREEN_WIDTH / 2;
		this.HALF_HEIGHT = this.SCREEN_HEIGHT / 2;
		this.mouseX = 0;
		this.mouseY = 0;
		this.numPoints = p.star_count;
		this.points = [];
		this.elt = p.elt;
		this.ctx = this.elt.getContext('2d');

		// initialize
		this.elt.setAttribute('width', this.SCREEN_WIDTH);
		this.elt.setAttribute('height', this.SCREEN_HEIGHT);

		this.boundOnMouseMove = e => this.onMouseMove(e);
		document.addEventListener('mousemove', this.boundOnMouseMove);

		// start program
		this.initPoints();
		this.loop();
	}

	destroy() {
		cancelAnimationFrame(this.animLoop);
		document.removeEventListener('mousemove', this.boundOnMouseMove);
	}

	onMouseMove(e) {
		this.mouseX = e.pageX - this.HALF_WIDTH; //- this.offsetLeft
		this.mouseY = e.pageY - this.HALF_HEIGHT; //- this.offsetTop
	}

	initPoints() {
		let point;
		for(let i = 0; i < this.numPoints; ++i) {
			point = [(Math.random() * 400) - 200, (Math.random() * 400) - 200, (Math.random() * 400) - 200];
			this.points.push(point);
		}
	}

	loop() {
		this.render();
		this.animLoop = requestAnimationFrame(() => this.loop());
	}

	render() {
		this.ctx.fillStyle = this.windowBg;
		this.ctx.fillRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

		for(let i = 0; i < this.numPoints; ++i) {
			let point3d = this.points[i];

			let z3d = point3d[2];
			z3d -= 1.08;

			if(z3d < -this.fov) {
				z3d += 400;
			}

			point3d[2] = z3d;
			this.draw3Din2D(point3d);
		}
	}

	draw3Din2D(point3d) {
		const x3d = point3d[0],
			y3d = point3d[1],
			z3d = point3d[2],
			scale = this.fov / (this.fov + z3d),
			x2d = (x3d * scale) + this.HALF_WIDTH - this.mouseX / 3,
			y2d = (y3d * scale) + this.HALF_HEIGHT - this.mouseY / 3
		;

		this.ctx.lineWidth = scale;
		this.ctx.strokeStyle = this.starColor;

		this.ctx.beginPath();
		this.ctx.moveTo(x2d, y2d);
		this.ctx.lineTo(x2d + scale, y2d);
		this.ctx.stroke();
	}
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdGFycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBbXCJlcnJvclwiLCB7XCJ2YXJzSWdub3JlUGF0dGVyblwiOiBcIlN0YXJyeUJnXCJ9XSAqL1xyXG4vKiBlc2xpbnQgY2FtZWxjYXNlOiAwICovXHJcblxyXG5jbGFzcyBTdGFycnlCZyB7XHJcblx0Y29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmJvdW5kT25Sb3V0ZSA9IChlKSA9PiB0aGlzLmRlc3Ryb3koZS5kZXRhaWwpO1xyXG5cdFx0YWRkRXZlbnRMaXN0ZW5lcigncm91dGUnLCB0aGlzLmJvdW5kT25Sb3V0ZSwge3Bhc3NpdmU6IHRydWV9KTtcclxuXHJcblx0XHRjb25zdCBjb2xvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9cmFkaW9dOmNoZWNrZWQnKS52YWx1ZTtcclxuXHRcdHRoaXMuaW5pdFN0YXIoY29sb3IpO1xyXG5cclxuXHRcdGxldCByYWRpb3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmFkaW9dJykpO1xyXG5cdFx0Zm9yKGxldCByYWRpbyBvZiByYWRpb3MpIHtcclxuXHRcdFx0cmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHRoaXMub25Db2xvckNoYW5nZShlLnRhcmdldC52YWx1ZSksIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly8gVE9ETzogbm90IHdvcmtpbmcgaW4gQ2hyb21lIG9yIEZGPz9cclxuXHRcdC8vIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXN0b20nKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCB0aGlzLm9uQ29sb3JDaGFuZ2UpO1xyXG5cdH1cclxuXHJcblx0ZGVzdHJveShwYWdlKSB7XHJcblx0XHRpZihwYWdlID09PSAnI3BsYXlncm91bmQvc3RhcnJ5LWJhY2tncm91bmQnKSB7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRyZW1vdmVFdmVudExpc3RlbmVyKCdyb3V0ZScsIHRoaXMuYm91bmRPblJvdXRlLCB7cGFzc2l2ZTogdHJ1ZX0pO1xyXG5cdFx0Y2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltTG9vcCk7XHJcblxyXG5cdFx0dGhpcy5zdGFyQmcuZGVzdHJveSgpO1xyXG5cclxuXHRcdGxldCByYWRpb3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmFkaW9dJykpO1xyXG5cdFx0Zm9yKGxldCByYWRpbyBvZiByYWRpb3MpIHtcclxuXHRcdFx0cmFkaW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHRoaXMub25Db2xvckNoYW5nZShlLnRhcmdldC52YWx1ZSksIHtwYXNzaXZlOiB0cnVlfSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Ly9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vbkNvbG9yQ2hhbmdlKTtcclxuXHRcdGRlbGV0ZSB3aW5kb3cuc3RhcnJ5Qmc7XHJcblx0fVxyXG5cclxuXHRpbml0U3Rhcihjb2xvcikge1xyXG5cdFx0dGhpcy5zdGFyQmcgPSBuZXcgU3RhckJnKHtcclxuXHRcdFx0ZWx0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnJ5LWNhbnZhcycpLFxyXG5cdFx0XHR3aW5kb3dfd2lkdGg6IFV0aWwuZ2V0TWFpbldpZHRoLFxyXG5cdFx0XHR3aW5kb3dfaGVpZ2h0OiA0MDAsXHJcblx0XHRcdHN0YXJfY29sb3I6IGNvbG9yLFxyXG5cdFx0XHRzdGFyX2NvdW50OiAxMzAwLFxyXG5cdFx0XHRzdGFyX2RlcHRoOiAzMzAsXHJcblx0XHRcdGNvbnRhaW5lcjogJ3N0YXJyeS1jYW52YXMnXHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdG9uQ29sb3JDaGFuZ2UoY29sb3IpIHtcclxuXHRcdHRoaXMuc3RhckJnLmRlc3Ryb3koKTtcclxuXHRcdGRlbGV0ZSB0aGlzLnN0YXJCZztcclxuXHJcblx0XHR0aGlzLmluaXRTdGFyKGNvbG9yKTtcclxuXHR9XHJcbn1cclxuXHJcbmNsYXNzIFN0YXJCZyB7XHJcblx0Y29uc3RydWN0b3IocCkge1xyXG5cdFx0dGhpcy53aW5kb3dCZyA9ICcjMDAwJztcclxuXHRcdHRoaXMuc3RhckNvbG9yID0gcC5zdGFyX2NvbG9yO1xyXG5cdFx0dGhpcy5mb3YgPSBwLnN0YXJfZGVwdGg7XHJcblx0XHR0aGlzLlNDUkVFTl9XSURUSCA9IHAud2luZG93X3dpZHRoO1xyXG5cdFx0dGhpcy5TQ1JFRU5fSEVJR0hUID0gcC53aW5kb3dfaGVpZ2h0O1xyXG5cdFx0dGhpcy5IQUxGX1dJRFRIID0gdGhpcy5TQ1JFRU5fV0lEVEggLyAyO1xyXG5cdFx0dGhpcy5IQUxGX0hFSUdIVCA9IHRoaXMuU0NSRUVOX0hFSUdIVCAvIDI7XHJcblx0XHR0aGlzLm1vdXNlWCA9IDA7XHJcblx0XHR0aGlzLm1vdXNlWSA9IDA7XHJcblx0XHR0aGlzLm51bVBvaW50cyA9IHAuc3Rhcl9jb3VudDtcclxuXHRcdHRoaXMucG9pbnRzID0gW107XHJcblx0XHR0aGlzLmVsdCA9IHAuZWx0O1xyXG5cdFx0dGhpcy5jdHggPSB0aGlzLmVsdC5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuXHRcdC8vIGluaXRpYWxpemVcclxuXHRcdHRoaXMuZWx0LnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB0aGlzLlNDUkVFTl9XSURUSCk7XHJcblx0XHR0aGlzLmVsdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuU0NSRUVOX0hFSUdIVCk7XHJcblxyXG5cdFx0dGhpcy5ib3VuZE9uTW91c2VNb3ZlID0gZSA9PiB0aGlzLm9uTW91c2VNb3ZlKGUpO1xyXG5cdFx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZE9uTW91c2VNb3ZlKTtcclxuXHJcblx0XHQvLyBzdGFydCBwcm9ncmFtXHJcblx0XHR0aGlzLmluaXRQb2ludHMoKTtcclxuXHRcdHRoaXMubG9vcCgpO1xyXG5cdH1cclxuXHJcblx0ZGVzdHJveSgpIHtcclxuXHRcdGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbUxvb3ApO1xyXG5cdFx0ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5ib3VuZE9uTW91c2VNb3ZlKTtcclxuXHR9XHJcblxyXG5cdG9uTW91c2VNb3ZlKGUpIHtcclxuXHRcdHRoaXMubW91c2VYID0gZS5wYWdlWCAtIHRoaXMuSEFMRl9XSURUSDsgLy8tIHRoaXMub2Zmc2V0TGVmdFxyXG5cdFx0dGhpcy5tb3VzZVkgPSBlLnBhZ2VZIC0gdGhpcy5IQUxGX0hFSUdIVDsgLy8tIHRoaXMub2Zmc2V0VG9wXHJcblx0fVxyXG5cclxuXHRpbml0UG9pbnRzKCkge1xyXG5cdFx0bGV0IHBvaW50O1xyXG5cdFx0Zm9yKGxldCBpID0gMDsgaSA8IHRoaXMubnVtUG9pbnRzOyArK2kpIHtcclxuXHRcdFx0cG9pbnQgPSBbKE1hdGgucmFuZG9tKCkgKiA0MDApIC0gMjAwLCAoTWF0aC5yYW5kb20oKSAqIDQwMCkgLSAyMDAsIChNYXRoLnJhbmRvbSgpICogNDAwKSAtIDIwMF07XHJcblx0XHRcdHRoaXMucG9pbnRzLnB1c2gocG9pbnQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0bG9vcCgpIHtcclxuXHRcdHRoaXMucmVuZGVyKCk7XHJcblx0XHR0aGlzLmFuaW1Mb29wID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMubG9vcCgpKTtcclxuXHR9XHJcblxyXG5cdHJlbmRlcigpIHtcclxuXHRcdHRoaXMuY3R4LmZpbGxTdHlsZSA9IHRoaXMud2luZG93Qmc7XHJcblx0XHR0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLlNDUkVFTl9XSURUSCwgdGhpcy5TQ1JFRU5fSEVJR0hUKTtcclxuXHJcblx0XHRmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5udW1Qb2ludHM7ICsraSkge1xyXG5cdFx0XHRsZXQgcG9pbnQzZCA9IHRoaXMucG9pbnRzW2ldO1xyXG5cclxuXHRcdFx0bGV0IHozZCA9IHBvaW50M2RbMl07XHJcblx0XHRcdHozZCAtPSAxLjA4O1xyXG5cclxuXHRcdFx0aWYoejNkIDwgLXRoaXMuZm92KSB7XHJcblx0XHRcdFx0ejNkICs9IDQwMDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0cG9pbnQzZFsyXSA9IHozZDtcclxuXHRcdFx0dGhpcy5kcmF3M0RpbjJEKHBvaW50M2QpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0ZHJhdzNEaW4yRChwb2ludDNkKSB7XHJcblx0XHRjb25zdCB4M2QgPSBwb2ludDNkWzBdLFxyXG5cdFx0XHR5M2QgPSBwb2ludDNkWzFdLFxyXG5cdFx0XHR6M2QgPSBwb2ludDNkWzJdLFxyXG5cdFx0XHRzY2FsZSA9IHRoaXMuZm92IC8gKHRoaXMuZm92ICsgejNkKSxcclxuXHRcdFx0eDJkID0gKHgzZCAqIHNjYWxlKSArIHRoaXMuSEFMRl9XSURUSCAtIHRoaXMubW91c2VYIC8gMyxcclxuXHRcdFx0eTJkID0gKHkzZCAqIHNjYWxlKSArIHRoaXMuSEFMRl9IRUlHSFQgLSB0aGlzLm1vdXNlWSAvIDNcclxuXHRcdDtcclxuXHJcblx0XHR0aGlzLmN0eC5saW5lV2lkdGggPSBzY2FsZTtcclxuXHRcdHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gdGhpcy5zdGFyQ29sb3I7XHJcblxyXG5cdFx0dGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcblx0XHR0aGlzLmN0eC5tb3ZlVG8oeDJkLCB5MmQpO1xyXG5cdFx0dGhpcy5jdHgubGluZVRvKHgyZCArIHNjYWxlLCB5MmQpO1xyXG5cdFx0dGhpcy5jdHguc3Ryb2tlKCk7XHJcblx0fVxyXG59Il0sImZpbGUiOiJzdGFycy5qcyJ9

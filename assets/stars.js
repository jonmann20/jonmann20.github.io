'use strict';

class StarryBg {
	constructor() {
        this.boundOnRoute = (e) => this.destroy(e.detail);
        addEventListener('route', this.boundOnRoute, pListen ? {passive: true} : false);

		const color = document.querySelector('input[type=radio]:checked').value;
		this.initStar(color);

		let radios = Array.from(document.querySelectorAll('input[type=radio]'));
		for(let radio of radios) {
			radio.addEventListener('click', e => this.onColorChange(e.target.value));
		}

		// TODO: not working in Chrome or FF??
		// document.getElementById('custom').addEventListener('change', this.onColorChange);
	}

	destroy(page) {
        if(page === '#playground/starry-background') {
            return;
        }

        removeEventListener('route', this.boundOnRoute, pListen ? {passive: true} : false);
        cancelAnimationFrame(this.animLoop);

		this.starBg.destroy();

		let radios = Array.from(document.querySelectorAll('input[type=radio]'));
		for(let radio of radios) {
			radio.removeEventListener('click', e => this.onColorChange(e.target.value));
		}

		//document.getElementById('custom').removeEventListener('change', this.onColorChange);
		delete window.starryBg;
	}

	initStar(color) {
		this.starBg = new StarBg({
			elt: document.getElementById('starry-canvas'),
			window_width: util.getMainWidth(),
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
        this.w_b = '#000';
        this.s_color = p.star_color;
        this.fov = p.star_depth;
        this.SCREEN_WIDTH = p.window_width;
        this.SCREEN_HEIGHT = p.window_height;
        this.HALF_WIDTH = this.SCREEN_WIDTH / 2;
        this.HALF_HEIGHT = this.SCREEN_HEIGHT / 2;
        this.mouse_x = 0;
        this.mouse_y = 0;
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
        this.mouse_x = e.pageX - this.HALF_WIDTH; //- this.offsetLeft
        this.mouse_y = e.pageY - this.HALF_HEIGHT; //- this.offsetTop
    }

    initPoints() {
        let point;
        for(let i=0; i < this.numPoints; ++i) {
            point = [(Math.random() * 400) - 200, (Math.random() * 400) - 200, (Math.random() * 400) - 200];
            this.points.push(point);
        }
    }

    loop() {
        this.render();
        this.animLoop = requestAnimationFrame(() => this.loop());
    }

    render() {
        this.ctx.fillStyle = this.w_b;
        this.ctx.fillRect(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

        for(let i=0; i < this.numPoints; ++i) {
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
            x2d = (x3d * scale) + this.HALF_WIDTH - this.mouse_x / 3,
            y2d = (y3d * scale) + this.HALF_HEIGHT - this.mouse_y / 3
        ;

        this.ctx.lineWidth = scale;
        this.ctx.strokeStyle = this.s_color;

        this.ctx.beginPath();
        this.ctx.moveTo(x2d, y2d);
        this.ctx.lineTo(x2d + scale, y2d);
        this.ctx.stroke();
    }
}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdGFycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFN0YXJyeUJnIHtcblx0Y29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYm91bmRPblJvdXRlID0gKGUpID0+IHRoaXMuZGVzdHJveShlLmRldGFpbCk7XG4gICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoJ3JvdXRlJywgdGhpcy5ib3VuZE9uUm91dGUsIHBMaXN0ZW4gPyB7cGFzc2l2ZTogdHJ1ZX0gOiBmYWxzZSk7XG5cblx0XHRjb25zdCBjb2xvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9cmFkaW9dOmNoZWNrZWQnKS52YWx1ZTtcblx0XHR0aGlzLmluaXRTdGFyKGNvbG9yKTtcblxuXHRcdGxldCByYWRpb3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmFkaW9dJykpO1xuXHRcdGZvcihsZXQgcmFkaW8gb2YgcmFkaW9zKSB7XG5cdFx0XHRyYWRpby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gdGhpcy5vbkNvbG9yQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKSk7XG5cdFx0fVxuXG5cdFx0Ly8gVE9ETzogbm90IHdvcmtpbmcgaW4gQ2hyb21lIG9yIEZGPz9cblx0XHQvLyBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vbkNvbG9yQ2hhbmdlKTtcblx0fVxuXG5cdGRlc3Ryb3kocGFnZSkge1xuICAgICAgICBpZihwYWdlID09PSAnI3BsYXlncm91bmQvc3RhcnJ5LWJhY2tncm91bmQnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyKCdyb3V0ZScsIHRoaXMuYm91bmRPblJvdXRlLCBwTGlzdGVuID8ge3Bhc3NpdmU6IHRydWV9IDogZmFsc2UpO1xuICAgICAgICBjYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1Mb29wKTtcblxuXHRcdHRoaXMuc3RhckJnLmRlc3Ryb3koKTtcblxuXHRcdGxldCByYWRpb3MgPSBBcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W3R5cGU9cmFkaW9dJykpO1xuXHRcdGZvcihsZXQgcmFkaW8gb2YgcmFkaW9zKSB7XG5cdFx0XHRyYWRpby5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gdGhpcy5vbkNvbG9yQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKSk7XG5cdFx0fVxuXG5cdFx0Ly9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VzdG9tJykucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgdGhpcy5vbkNvbG9yQ2hhbmdlKTtcblx0XHRkZWxldGUgd2luZG93LnN0YXJyeUJnO1xuXHR9XG5cblx0aW5pdFN0YXIoY29sb3IpIHtcblx0XHR0aGlzLnN0YXJCZyA9IG5ldyBTdGFyQmcoe1xuXHRcdFx0ZWx0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnJ5LWNhbnZhcycpLFxuXHRcdFx0d2luZG93X3dpZHRoOiB1dGlsLmdldE1haW5XaWR0aCgpLFxuXHRcdFx0d2luZG93X2hlaWdodDogNDAwLFxuXHRcdFx0c3Rhcl9jb2xvcjogY29sb3IsXG5cdFx0XHRzdGFyX2NvdW50OiAxMzAwLFxuXHRcdFx0c3Rhcl9kZXB0aDogMzMwLFxuXHRcdFx0Y29udGFpbmVyOiAnc3RhcnJ5LWNhbnZhcydcblx0XHR9KTtcblx0fVxuXG5cdG9uQ29sb3JDaGFuZ2UoY29sb3IpIHtcblx0XHR0aGlzLnN0YXJCZy5kZXN0cm95KCk7XG5cdFx0ZGVsZXRlIHRoaXMuc3RhckJnO1xuXG5cdFx0dGhpcy5pbml0U3Rhcihjb2xvcik7XG5cdH1cbn1cblxuY2xhc3MgU3RhckJnIHtcbiAgICBjb25zdHJ1Y3RvcihwKSB7XG4gICAgICAgIHRoaXMud19iID0gJyMwMDAnO1xuICAgICAgICB0aGlzLnNfY29sb3IgPSBwLnN0YXJfY29sb3I7XG4gICAgICAgIHRoaXMuZm92ID0gcC5zdGFyX2RlcHRoO1xuICAgICAgICB0aGlzLlNDUkVFTl9XSURUSCA9IHAud2luZG93X3dpZHRoO1xuICAgICAgICB0aGlzLlNDUkVFTl9IRUlHSFQgPSBwLndpbmRvd19oZWlnaHQ7XG4gICAgICAgIHRoaXMuSEFMRl9XSURUSCA9IHRoaXMuU0NSRUVOX1dJRFRIIC8gMjtcbiAgICAgICAgdGhpcy5IQUxGX0hFSUdIVCA9IHRoaXMuU0NSRUVOX0hFSUdIVCAvIDI7XG4gICAgICAgIHRoaXMubW91c2VfeCA9IDA7XG4gICAgICAgIHRoaXMubW91c2VfeSA9IDA7XG4gICAgICAgIHRoaXMubnVtUG9pbnRzID0gcC5zdGFyX2NvdW50O1xuICAgICAgICB0aGlzLnBvaW50cyA9IFtdO1xuICAgICAgICB0aGlzLmVsdCA9IHAuZWx0O1xuICAgICAgICB0aGlzLmN0eCA9IHRoaXMuZWx0LmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZVxuICAgICAgICB0aGlzLmVsdC5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgdGhpcy5TQ1JFRU5fV0lEVEgpO1xuICAgICAgICB0aGlzLmVsdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuU0NSRUVOX0hFSUdIVCk7XG5cblx0XHR0aGlzLmJvdW5kT25Nb3VzZU1vdmUgPSBlID0+IHRoaXMub25Nb3VzZU1vdmUoZSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRPbk1vdXNlTW92ZSk7XG5cbiAgICAgICAgLy8gc3RhcnQgcHJvZ3JhbVxuICAgICAgICB0aGlzLmluaXRQb2ludHMoKTtcbiAgICAgICAgdGhpcy5sb29wKCk7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5hbmltTG9vcCk7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMuYm91bmRPbk1vdXNlTW92ZSk7XG4gICAgfVxuXG4gICAgb25Nb3VzZU1vdmUoZSkge1xuICAgICAgICB0aGlzLm1vdXNlX3ggPSBlLnBhZ2VYIC0gdGhpcy5IQUxGX1dJRFRIOyAvLy0gdGhpcy5vZmZzZXRMZWZ0XG4gICAgICAgIHRoaXMubW91c2VfeSA9IGUucGFnZVkgLSB0aGlzLkhBTEZfSEVJR0hUOyAvLy0gdGhpcy5vZmZzZXRUb3BcbiAgICB9XG5cbiAgICBpbml0UG9pbnRzKCkge1xuICAgICAgICBsZXQgcG9pbnQ7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5udW1Qb2ludHM7ICsraSkge1xuICAgICAgICAgICAgcG9pbnQgPSBbKE1hdGgucmFuZG9tKCkgKiA0MDApIC0gMjAwLCAoTWF0aC5yYW5kb20oKSAqIDQwMCkgLSAyMDAsIChNYXRoLnJhbmRvbSgpICogNDAwKSAtIDIwMF07XG4gICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHBvaW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvb3AoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHRoaXMuYW5pbUxvb3AgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5sb29wKCkpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jdHguZmlsbFN0eWxlID0gdGhpcy53X2I7XG4gICAgICAgIHRoaXMuY3R4LmZpbGxSZWN0KDAsIDAsIHRoaXMuU0NSRUVOX1dJRFRILCB0aGlzLlNDUkVFTl9IRUlHSFQpO1xuXG4gICAgICAgIGZvcihsZXQgaT0wOyBpIDwgdGhpcy5udW1Qb2ludHM7ICsraSkge1xuICAgICAgICAgICAgbGV0IHBvaW50M2QgPSB0aGlzLnBvaW50c1tpXTtcblxuICAgICAgICAgICAgbGV0IHozZCA9IHBvaW50M2RbMl07XG4gICAgICAgICAgICB6M2QgLT0gMS4wODtcblxuICAgICAgICAgICAgaWYoejNkIDwgLXRoaXMuZm92KSB7XG4gICAgICAgICAgICAgICAgejNkICs9IDQwMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9pbnQzZFsyXSA9IHozZDtcbiAgICAgICAgICAgIHRoaXMuZHJhdzNEaW4yRChwb2ludDNkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYXczRGluMkQocG9pbnQzZCkge1xuICAgICAgICBjb25zdCB4M2QgPSBwb2ludDNkWzBdLFxuICAgICAgICAgICAgeTNkID0gcG9pbnQzZFsxXSxcbiAgICAgICAgICAgIHozZCA9IHBvaW50M2RbMl0sXG4gICAgICAgICAgICBzY2FsZSA9IHRoaXMuZm92IC8gKHRoaXMuZm92ICsgejNkKSxcbiAgICAgICAgICAgIHgyZCA9ICh4M2QgKiBzY2FsZSkgKyB0aGlzLkhBTEZfV0lEVEggLSB0aGlzLm1vdXNlX3ggLyAzLFxuICAgICAgICAgICAgeTJkID0gKHkzZCAqIHNjYWxlKSArIHRoaXMuSEFMRl9IRUlHSFQgLSB0aGlzLm1vdXNlX3kgLyAzXG4gICAgICAgIDtcblxuICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSBzY2FsZTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSB0aGlzLnNfY29sb3I7XG5cbiAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMuY3R4Lm1vdmVUbyh4MmQsIHkyZCk7XG4gICAgICAgIHRoaXMuY3R4LmxpbmVUbyh4MmQgKyBzY2FsZSwgeTJkKTtcbiAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgfVxufSJdLCJmaWxlIjoic3RhcnMuanMifQ==

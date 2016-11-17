'use strict';

class StarryBg {
	constructor() {
		const color = document.querySelector('input[type=radio]:checked').value;
		this.initStar(color);
		
		let radios = document.querySelectorAll('input[type=radio]');
		for(let radio of radios) {
			radio.addEventListener('click', e => this.onColorChange(e.target.value));
		}
		
		// TODO: not working in Chrome or FF??
		// document.getElementById('custom').addEventListener('change', this.onColorChange);
	}

	destroy() {
		this.starBg.destroy();
		
		let radios = document.querySelectorAll('input[type=radio]');
		for(let radio of radios) {
			radio.removeEventListener('click', e => this.onColorChange(e.target.value));
		}
		
		//document.getElementById('custom').removeEventListener('change', this.onColorChange);
	}
	
	initStar(color) {
		this.starBg = new StarBg({
			elt: document.getElementById('html5_star'),
			window_width: $('.main').width(),
			window_height: 400,
			star_color: color,
			star_count: 1300,
			star_depth: 330,
			container: 'html5_star'
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

            if (z3d < -this.fov)
                z3d += 400;

            point3d[2] = z3d;
            this.draw3Din2D(point3d);
        }
    }
    
    draw3Din2D(point3d) {
        let x3d = point3d[0],
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
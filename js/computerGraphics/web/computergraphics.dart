import 'dart:html';
import 'dart:math';

//http://williams.best.vwh.net/sunrise_sunset_algorithm.htm
//http://blog.greweb.fr/2012/05/illuminated-js-2d-lights-and-shadows-rendering-engine-for-html5-applications/

class Sun {
	num x = 0,
	    y = 0,
	    r = 70,
	    oldX = 0,
	    oldY = 0,
	    vX = 0,
	    vY = 0
	;
}

class Wave {
	num x = 0,
		y = 0
	;
}

class Simulation {
	Sun sun = new Sun();
	Wave wave = new Wave();

	var canvas;
	var ctx;

	num FULLW, FULLH, HALFW, HALFH, mouse_x, mouse_y = 70, dt = 0, oldTime = 0, particlesY=0;
	var diffuse = 0.08;
	bool mouseDown = false;

	Simulation(){
		canvas = document.querySelector("canvas");
		ctx = canvas.getContext("2d");
		print("here");
		FULLW = canvas.width = 600;
		FULLH = canvas.height = 400;
		HALFW = FULLW / 2;
		HALFH = FULLH / 2;

		sun.x = mouse_x = HALFW;
		sun.y = mouse_y;

		setupMouseEvts();
	}

	void setupMouseEvts(){
		canvas.onMouseDown.listen((e){
			e.preventDefault();     // prevent webkit text select
			mouseDown = true;
		});

		window.onMouseUp.listen((e){
			mouseDown = false;
		});

		canvas.onMouseMove.listen((e){
			if(mouseDown){
				mouse_x = e.client.x - canvas.offset.left;
				mouse_y = e.client.y - canvas.offset.top;

				sun.vX = (sun.x - sun.oldX) / dt;

				if(mouse_x > FULLW)
					mouse_x = FULLW;
				else if(mouse_x < 0)
				    mouse_x = 0;

				if(mouse_y > FULLH)
					mouse_y = FULLH;
				else if(mouse_y < 0)
				    mouse_y = 0;
			}
		});

		// page elts
		InputElement slider = querySelector('.diffusionRate');

		slider.onChange.listen((e){
			diffuse = slider.value;
			querySelector('.litDiffusion').innerHtml = diffuse.toString();
		});

		window.requestAnimationFrame(runSim);
	}

	void runSim(time) {
		dt = (time-oldTime)/1000;

		update();
		render();

		oldTime = time;
		window.requestAnimationFrame(runSim);
	}

	void update(){
		sun.x = mouse_x;
		sun.y = mouse_y;

		particlesY -= 0.01;
	}

	void render(){
		ctx.fillStyle = '#bbd9ee';
		ctx.fillRect(0,0,FULLW,FULLH);
		drawCircle('255, 165, 0');

		//drawWave();
	}

	void drawCircle(c) {
		ctx.beginPath();

		var rad = ctx.createRadialGradient(sun.x, sun.y, 1, sun.x, sun.y, sun.r);
		rad.addColorStop(0, 'rgba(' + c + ',1)');
		rad.addColorStop(1, 'rgba(' + c + ',' + diffuse.toString() + ')');
		ctx.fillStyle = rad;

		ctx.arc(sun.x, sun.y, sun.r, 0, PI*2, false);
		ctx.fill();
	}

	void drawWave(){//http://falcon80.com/HTMLCanvas/Animation/SineWave.html
		//ctx.fillStyle = 'blue';
		//ctx.fillRect(sin(particlesY) * 100, particlesY, 32, 32);

		// Find the sine of the angle
		wave.y = sin(wave.x*PI/180);

		// If the sine value is positive, map it above y = 100 and change the colour to blue
		if(wave.y >=0){
		    wave.y = 100 - (wave.y-0) * 50;
		    ctx.fillStyle = "blue";
		}

		// If the sine value is negative, map it below y = 100 and change the colour to red
		if( wave.y < 0 ) {
		  	wave.y = 250 + (0-wave.y) * 50;
			ctx.fillStyle = "red";
		}

		// We will use the fillRect method to draw the actual wave. The length and breath of the
		ctx.fillRect(wave.x, wave.y, sin(wave.x * PI/180) * 5, sin(wave.x * PI/180 * 5));

		// Increment the angle.
		++wave.x;
	}
}

void main() {
	new Simulation();
}

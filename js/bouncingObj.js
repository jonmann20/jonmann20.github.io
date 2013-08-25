jw.Bounce = (function ($, undefined) {
    var canvas,
		ctx,
		obj = {
		    color: '#FBCF32',
		    w: 40,
		    h: 40,
		    r: 20,
		    x: 0,
		    y: 0,
		    vX: 0,
		    vY: 0,
		    aX: 0,
		    aY: 0
		},
		gravity = 1.2,
		friction = 0.015,
		_time,
		dt
    ;


    /* 
		Kinematic equations:
		
		acceleration:
		a(t) = a0 - gravity
		
		velocity:
		v(t) = v0 + a*dt
		
		position:
		d(t) = 1/2 * a * dt^2 + v0*dt + d0
		
	*/


    /*************** Update ***************/

    function getPosX() {
        return (0.5 * obj.aX * (dt * dt)) + (obj.vX * dt) + obj.x;
    }

    function getPosY() {
        return (0.5 * obj.aY * (dt * dt)) + (obj.vY * dt) + obj.y;
    }

    function doAcceleration() {
        if (obj.vX > 0)
            obj.aX -= friction;

        if (obj.vX === 0)
            obj.aX = 0;


        if (obj.vY < 0)
            obj.aY += gravity;
    }

    function doVelocity() {
        obj.vX += obj.aX * dt;
        obj.vY += obj.aY * dt;

        if (Math.abs(obj.vX) < 1)
            obj.vX = 0;

        if (Math.abs(obj.vY) < 1)
            obj.vY = 0;

        //console.log(obj.vX)
    }

    function doPosition() {
        obj.x = getPosX();
        obj.y = getPosY();


        if (obj.y >= canvas.height - obj.h / 2 - 28) {
            obj.y = canvas.height - obj.h / 2 - 29;

            if (obj.vY > 90) {

                obj.vY = obj.vY * (-1) + obj.vY / 8;	//  lose some energy to floor

            }
            else {
                obj.vY = obj.aY = 0;
            }


            //obj.vX *= 2.4

        }

    }

    function update() {
        doAcceleration();
        doVelocity();
        doPosition();
    }


    /*************** Render ***************/

    function drawObj() {
        ctx.fillStyle = obj.color;
        ctx.beginPath();
        ctx.arc(obj.x, obj.y, obj.r, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    function render() {
        // background
        ctx.fillStyle = '#002E62';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // floor
        ctx.fillStyle = '#804000';
        ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
        ctx.fillStyle = '#987654';
        ctx.fillRect(0, canvas.height - 31, canvas.width, 1);

        drawObj();
    }


    function loop(time) {

        var now = time;
        dt = now - (_time || now);
        _time = now;

        dt /= 1000;

        update();
        render();

        requestAnimFrame(loop);
    }


    function setup() {
        obj.x = 40;
        obj.y = canvas.height - obj.h / 2 - 29;
        obj.vX = canvas.width / 10;
        obj.vY = (canvas.height / 3) * (-1);
        obj.aX = 0;
        obj.aY = 0;
    }

    function clickEvents() {
        $('.bigBtn').on('click', function (e) {
            e.preventDefault();

            setup();
        });
    }

    return {
        init: function () {
            canvas = $('canvas')[0];
            ctx = canvas.getContext('2d');
            canvas.width = $('.main').width() / 1.5;
            canvas.height = canvas.width / 2;

            clickEvents();

            setup();

            requestAnimFrame(loop);
        }
    };

})(jQuery);

window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
    		window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      ||
			function(callback){
              window.setTimeout(callback, 1000 / 60);
            };
})();



$(function () {
    jw.Bounce.init();
});
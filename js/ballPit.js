jw.BallPit = (function () {

    var canvas = $('canvas')[0],
        ctx = canvas.getContext('2d'),
        radius = 3.5,
        ballArr = []
    ;


    window.requestAnimFrame = (function () {
        return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
    })();


    function ballPitMain() {
        // initialize the array of balls
        for (var i = 0; i < 20; i++) {
            var ball = {
                x: Math.floor(Math.random() * (canvas.width + 1)),
                y: Math.floor(Math.random() * (canvas.height + 1)),
                velocity: {
                    x: Math.floor(Math.random() * (-3)),  // [-2, 2]
                    y: Math.floor(Math.random() * 7) - 3  // [-3, 3]
                }
            };
            ballArr.push(ball);
        }

        runSim();
    };


    var update = {
        init: function () {

            // update position
            for (var i in ballArr) {
                ballArr[i].x += ballArr[i].velocity.x;
                ballArr[i].y += ballArr[i].velocity.y;
            }

            // detect collisions
            var b;

            for (var i = 0; i < ballArr.length; i++) {
                b = ballArr[i];

                if (b.x < 0 && b.velocity.x < 0)
                    b.velocity.x = -b.velocity.x;

                if (b.y >= canvas.height && b.velocity.y > 0)
                    b.velocity.y = -b.velocity.y;

                if (b.x >= canvas.width && b.velocity.x > 0)
                    b.velocity.x = -b.velocity.x;

                if (b.y < 0 && b.velocity.y < 0)
                    b.velocity.y = -b.velocity.y;
            }
        }
    };

    var render = {
        init: function () {
            // draw background
            ctx.fillStyle = "#0098ff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // draw balls 
            ctx.fillStyle = "#e1e1e1";
            for (var i in ballArr) {
                ctx.beginPath();
                ctx.arc(ballArr[i].x, ballArr[i].y, radius, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.lineWidth = radius / 15;
                ctx.strokeStyle = '#19a2ff';
                ctx.stroke();
                ctx.closePath();
            }
        }
    };

    function runSim() {
        setTimeout(function () {
            requestAnimFrame(runSim);

            update.init();
            render.init();
        }, 1000 / 60);
    }

    function fixArr(num) {
        var diff = ballArr.length - num;

        if (diff > 0) {
            for (var i = 0; i < diff; i++) {
                ballArr.pop();
            }
        }
        else if (diff < 0) {
            diff = -diff;

            for (var i = 0; i < diff; i++) {
                var ball = {						// (max   - min + 1)  + min
                    x: Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,  // [0, canvas.width]
                    y: Math.floor(Math.random() * (canvas.height + 1)), 		// [0, canvas.height]
                    velocity: {
                        x: Math.floor(Math.random() * (2 - (-2) + 1)) + (-2),  // [-2, 2]
                        y: Math.floor(Math.random() * (3 - (-3) + 1)) + (-3)   // [-3, 3]
                    }
                };

                if (ball.velocity.x == 0)
                    ball.velocity.x = 1;
                if (ball.velocity.y === 0)
                    ball.velocity.y = 1;

                ballArr.push(ball);
            }
        }
    }

    function updateUserSpeed(oldSpeed, newSpeed) {
        var b, originalVx, originalVy;

        for (var i = 0; i < ballArr.length; i++) {
            b = ballArr[i];

            originalVx = b.velocity.x / oldSpeed;
            originalVy = b.velocity.y / oldSpeed;

            b.velocity.x = originalVx * newSpeed;
            b.velocity.y = originalVy * newSpeed;
        }
    }


    return {
        init: function () {
            canvas.width = $('.main').width() / 1.5;
            canvas.height = canvas.width / 2;

            // run default simulation
            ballPitMain();

            // set up modifications 
            $('.numBalls').change(function () {
                var num = $(this).val();
                $('.litNumBalls').html(num);
                fixArr(num);
            });

            $('.sizeBalls').change(function () {
                var num = $(this).val();
                $('.litSizeBalls').html(num);
                radius = num;
            });

            $('.speedBalls').change(function () {
                var num = $(this).val();

                updateUserSpeed($('.litSpeedBalls').html(), num);

                $('.litSpeedBalls').html(num);
            });
        }
    };
})();


$(function () {

    // TODO: move to playground model

    jw.BallPit.init();
});
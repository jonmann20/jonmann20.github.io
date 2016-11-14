'use strict';

jw.BallPit = (function() {
    var canvas,
        ctx,
        radius,
        ballArr,
        animLoop
    ;

    function update() {
        // update position
        for(var i in ballArr) {
            ballArr[i].x += ballArr[i].velocity.x;
            ballArr[i].y += ballArr[i].velocity.y;
        }

        // detect collisions
        var b;
        for(i=0; i < ballArr.length; ++i) {
            b = ballArr[i];

            if(b.x < 0 && b.velocity.x < 0)
                b.velocity.x = -b.velocity.x;

            if(b.y >= canvas.height && b.velocity.y > 0)
                b.velocity.y = -b.velocity.y;

            if(b.x >= canvas.width && b.velocity.x > 0)
                b.velocity.x = -b.velocity.x;

            if(b.y < 0 && b.velocity.y < 0)
                b.velocity.y = -b.velocity.y;
        }
    }

    function render() {
        // draw background
        ctx.fillStyle = '#0098ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // draw balls
        ctx.fillStyle = '#e1e1e1';
        for(var i in ballArr) {
            ctx.beginPath();
            ctx.arc(ballArr[i].x, ballArr[i].y, radius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.lineWidth = radius / 15;
            ctx.strokeStyle = '#19a2ff';
            ctx.stroke();
            ctx.closePath();
        }
    }

    function runSim() {
        update();
        render();

        animLoop = requestAnimationFrame(runSim);
    }

    function fixArr(num) {
        var i=0, diff = ballArr.length - num;

        if(diff > 0) {
            for(; i < diff; ++i) {
                ballArr.pop();
            }
        }
        else if(diff < 0) {
            diff = -diff;

            for(; i < diff; ++i) {
                var ball = {						// (max   - min + 1)  + min
                    x: Math.floor(Math.random() * (canvas.width - 0 + 1)) + 0,  // [0, canvas.width]
                    y: Math.floor(Math.random() * (canvas.height + 1)), 		// [0, canvas.height]
                    velocity: {
                        x: Math.floor(Math.random() * (2 - (-2) + 1)) + (-2),  // [-2, 2]
                        y: Math.floor(Math.random() * (3 - (-3) + 1)) + (-3)   // [-3, 3]
                    }
                };

                if (ball.velocity.x === 0)
                    ball.velocity.x = 1;

                if (ball.velocity.y === 0)
                    ball.velocity.y = 1;

                ballArr.push(ball);
            }
        }
    }

    function updateUserSpeed(oldSpeed, newSpeed) {
        var b, originalVx, originalVy;

        for(var i=0; i < ballArr.length; ++i) {
            b = ballArr[i];

            originalVx = b.velocity.x / oldSpeed;
            originalVy = b.velocity.y / oldSpeed;

            b.velocity.x = originalVx * newSpeed;
            b.velocity.y = originalVy * newSpeed;
        }
    }

    function onNumBalls() {
        var num = this.value;
        document.querySelector('.litNumBalls').textContent = num;
        fixArr(num);
    }
    
    function onSizeBalls() {
        var num = this.value;
        document.querySelector('.litSizeBalls').textContent = num;
        radius = num;
    }
    
    function onSpeedBalls() {
        var num = this.value;
        updateUserSpeed(document.querySelector('.litSpeedBalls').textContent, num);
        document.querySelector('.litSpeedBalls').textContent = num;
    }

    return {
        init: function() {
            canvas = document.querySelector('canvas');
            ctx = canvas.getContext('2d');
            radius = 3.5;
            ballArr = [];

            canvas.width = $('.main').width() / 1.5;
            canvas.height = canvas.width / 2;

            // set up modifications
            document.querySelector('.numBalls').addEventListener('input', onNumBalls);
            document.querySelector('.sizeBalls').addEventListener('input', onSizeBalls);
            document.querySelector('.speedBalls').addEventListener('input', onSpeedBalls);

            // initialize the array of balls
            for(var i=0; i < 20; ++i) {
                ballArr.push({
                    x: Math.floor(Math.random() * (canvas.width + 1)),
                    y: Math.floor(Math.random() * (canvas.height + 1)),
                    velocity: {
                        x: Math.floor(Math.random() * (-3)),  // [-2, 2]
                        y: Math.floor(Math.random() * 7) - 3  // [-3, 3]
                    }
                });
            }

            runSim();
        },
        
        deInit: function() {
            window.cancelAnimationFrame(animLoop);
            
            const numBalls = document.querySelector('.numBalls');
            const sizeBalls = document.querySelector('.sizeBalls');
            const speedBalls = document.querySelector('.speedBalls');
            
            if(numBalls) {
                numBalls.removeEventListener('input', onNumBalls);
            }
            
            if(sizeBalls) {
               sizeBalls.removeEventListener('input', onSizeBalls);
            }
            
            if(speedBalls) {
                speedBalls.removeEventListener('input', onSpeedBalls);
            }
        }
    };
})();
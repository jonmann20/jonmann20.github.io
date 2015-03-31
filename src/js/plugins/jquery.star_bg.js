;(function($, undefined){
    $.fn.star_bg = function (p) {
        var w_b = "#000",
            s_color = p.star_color,
            fov = p.star_depth,
            SCREEN_WIDTH = p.window_width,
            SCREEN_HEIGHT = p.window_height,
            HALF_WIDTH = SCREEN_WIDTH / 2,
            HALF_HEIGHT = SCREEN_HEIGHT / 2
            mouse_x = 0,
            mouse_y = 0,
            numPoints = p.star_count,
            points = [],
            ctx = $(this)[0].getContext("2d")
        ;

        // initialize
        $(this).attr({
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT
        });

        $.fn.star_bg.boundMouse = $(document).on("mousemove", function (e) {
            mouse_x = e.pageX - HALF_WIDTH; //- this.offsetLeft
            mouse_y = e.pageY - HALF_HEIGHT; //- this.offsetTop
        });

        function initPoints() {
            for(i=0; i < numPoints; ++i) {
                var point = [(Math.random() * 400) - 200, (Math.random() * 400) - 200, (Math.random() * 400) - 200];
                points.push(point);
            }
        }

        function draw3Din2D(point3d) {
            var x3d = point3d[0],
                y3d = point3d[1],
                z3d = point3d[2],
                scale = fov / (fov + z3d),
                x2d = (x3d * scale) + HALF_WIDTH - mouse_x / 3,
                y2d = (y3d * scale) + HALF_HEIGHT - mouse_y / 3
            ;

            ctx.lineWidth = scale;
            ctx.strokeStyle = s_color;

            ctx.beginPath();
            ctx.moveTo(x2d, y2d);
            ctx.lineTo(x2d + scale, y2d);
            ctx.stroke();
        }

        function render() {
            ctx.fillStyle = w_b;
            ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

            for(i=0; i < numPoints; ++i) {
                var point3d = points[i];

                var z3d = point3d[2];
                z3d -= 1.08;

                if (z3d < -fov)
                    z3d += 400;

                point3d[2] = z3d;
                draw3Din2D(point3d);
            }
        }

        function loop() {
            render();
            $.fn.star_bg.animLoop = requestAnimationFrame(loop);
        }

        // start program
        initPoints();
        loop();
    }

    $.fn.star_bg.destroy = function () {
        window.cancelAnimationFrame($.fn.star_bg.animLoop);
        $.fn.star_bg.boundMouse.off();
    }
})(jQuery);
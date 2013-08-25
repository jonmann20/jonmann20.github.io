jw.PlaygroundModel = (function ($, undefined) {

    /********** Stars **********/
    function initStar(w, color) {
        $("#html5_star").star_bg({
            window_width: w,
            window_height: "400",
            star_color: color,
            window_background: "",
            star_count: "1300",
            star_depth: "330",
            container: "html5_star"
        });
    };

    function stars() {
        var w = $(".main").width();
        var color = $("input[type=radio]:checked").val();
        initStar(w, color);

        $("input[type=color]").change(function () {
            color = $(this).val();

            $("canvas").remove();
            $(".canvasWrap").append($("<canvas id=\'html5_star\'>unsupported browser</canvas>"));

            initStar(w, color);
        });

        $("input[type=radio]").on("click", function () {
            color = $("input[type=radio]:checked").val();

            $("canvas").remove();
            $(".canvasWrap").append($("<canvas id=\'html5_star\'>unsupported browser</canvas>"));

            initStar(w, color);
        });
    }

    /********** USTRAM **********/
    function truncate(str){
        if(strlen(str) > 22) {
            str = str.substr(0, 22) + "...";
        }
        return str;
    }

    function getVidList(){
        var $request = 'http://api.ustream.tv';
        var $format = 'php';                // this can be xml, json, html, or php
        var $args = 'subject=channel';
        $args += '&uid=sharewohl';
        $args += '&command=listAllVideos';
        $args += '&params=';
        $args += '&page=1';
        $args += '&limit=5';
        $args += '&key=8EC9915C3CC87E5F5A6E2D84FAD520A7';
    
        // Get and config the curl session object
        var $session = curl_init($request + '/' + $format + '?' + $args);
        curl_setopt($session, CURLOPT_HEADER, false);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    
        //execute the request and close
        var $response = curl_exec($session);
        curl_close($session);
    
        // this line works because we requested $format='php' and not some other output format
        var $resultsArray = unserialize($response);
    
        return $resultsArray['results'];
    }

    function getRandom(){
        var $request =  'http://api.ustream.tv';
        var $format = 'php';                // this can be xml, json, html, or php
        $args = 'subject=stream';
        $args += '&uid=all';
        $args += '&command=getRandom';
        $args += '&params=';
        $args += '&page=1';
        $args += '&limit=1';
        $args += '&key=8EC9915C3CC87E5F5A6E2D84FAD520A7';
    
        // Get and config the curl session object
        var $session = curl_init($request + '/' + $format + '?' + $args);
        curl_setopt($session, CURLOPT_HEADER, false);
        curl_setopt($session, CURLOPT_RETURNTRANSFER, true);
    
        //execute the request and close
        var $response = curl_exec($session);
        curl_close($session);
    
        // this line works because we requested $format='php' and not some other output format
        var $resultsArray = unserialize($response);
    
        var $result1 = $resultsArray['results'];
        var $result =  $result1[0];
        return $result['embedTag'];
    }


    function ustream() {
        jw.Utils.require("//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js", function () {
            $(".list li").draggable({
                stop: function(e, ui){
                    $(this).css({height: "21px"});
                    $(this).children(".vid").css({display: "block"});
                },
                cancel: "object"
            });

            var list = getVidList();
            
            var str = '<ul>';
            for(var i=0; i < list.length; ++i){
                str += '<li><div class="vid">' + list[i]['embedTag'] + '</div>' + truncate(list[i]['title']) + '</li>';
            }
            str += '</ul>';

            $(".list").html(str);
        });
    }


    return {
        render: function (that, page) {
            jw.Utils.resetModel();

            if (page === "index") {
                that.load("/playground/index.html", function (data) {
                    jw.main.html(data);

                    that.load("/playground/playgroundNav.html", function (data) {
                        $(".playgroundNav").html(data);

                        $(".colL ul").hoverCarousel();
                    });
                });

                document.title = "Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("absHover playground");
            }
            else if (page === "ballPit") {
                that.load("/playground/ballPit.html", function (data) {
                    jw.main.html(data);

                    jw.Utils.require("/js/ballPit.js", function () {
                        jw.BallPit.init();
                    });
                });

                document.title = "Ball Pit | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a ball pit.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav3");
            }
            else if (page === "stars") {
                that.load("/playground/stars.html", function (data) {
                    jw.main.html(data);

                    jw.Utils.require("/js/html5_star.js", function () {
                        stars();    // TODO: move to its own file
                    });
                });

                document.title = "Starry Background | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a starry background.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav2");
            }
            else if (page === "bObj") {
                that.load("/playground/stars.html", function (data) {
                    jw.main.html(data);

                    jw.Utils.require("/js/bouncingObj.js", function () { });
                });

                document.title = "Bouncing Object | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a bouncing object.' />" +
                               "<meta name='keywords' content='canvas, html5' />"
                );
                jw.body.addClass("playground playInner nav6");
            }
            else if (page === "ustream") {
                that.load("/playground/USTREAM-demo.html", function (data) {
                    jw.main.html(data);

                    ustream();  // TODO: move to own file; migrate PHP code to JS/json
                });

                document.title = "USTREAM demo | Playground";
                jw.head.append("<meta name='description' content='A USTREAM api demo.' />" +
                               "<meta name='keywords' content='USTREAM' />"
                );
                jw.body.addClass("playground playInner pageFullW uStreamPage nav5");
            }
            else if (page === "bCube") {
                that.load("/playground/breakdancing-cube.html", function (data) {
                    jw.main.html(data);

                    $("#cube").on("click", function (e) {
                        e.preventDefault();
                    });
                });

                document.title = "Breakdancing Cube | Playground";
                jw.head.append("<meta name='description' content='Pure CSS3 animation demo.' />" +
                               "<meta name='keywords' content='CSS3, HTML5' />"
                );
                jw.body.addClass("playground playInner bDancingCube nav1");
            }
            else if (page === "fSun") {
                that.load("/playground/floating-sun.html", function (data) {
                    jw.main.html(data);

                    jw.Utils.require("/js/computerGraphics/web/computergraphics.dart.js", function () { });
                });

                document.title = "Floating Sun | Playground";
                jw.head.append("<meta name='description' content='A canvas example showcasing a computer graphics simulation.' />" +
                               "<meta name='keywords' content='canvas, html5, computer graphics' />"
                );
                jw.body.addClass("playground playInner nav4");
            }



            if (page !== "index") {
                $(".dPlaygroundNav").show();

                that.load("/playground/playgroundNav.html", function (data) {
                    $(".dPlaygroundNav").html(data);
                });
            }
        }
    };
})(jQuery);
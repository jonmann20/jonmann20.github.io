'use strict';

jw.PlaygroundModel = (function() {

    return {
        render: function(that, page) {
            jw.Util.resetModel();

            if(page === 'index') {
                that.load('/playground/index.html', function(data) {}).swap();

                document.title = 'Playground';
                jw.Util.addMeta('description', 'An playground area for web tech demos.');
                jw.Util.addMeta('keywords', 'canvas, html5');
                document.body.classList.add('playground', 'playInner');
            }
            else if(page === 'ballPit') {
                that.load('/playground/ballPit.html', function(data) {
                    jw.Util.require('/js/ballPit.js', function() {
                        jw.BallPit.init();
                    });
                }).swap();

                document.title = 'Ball Pit | Playground';
                jw.Util.addMeta('description', 'A canvas example showcasing a ball pit.');
                jw.Util.addMeta('keywords', 'canvas, html5');
                document.body.classList.add('playground', 'playInner', 'nav3');
            }
            else if(page === 'stars') {
                that.load('/playground/stars.html', function(data) {
                    // TODO: load these async
                    jw.Util.require('/js/plugins/jquery.star_bg.js', function() {
                        jw.Util.require('/js/stars.js', function(cached) {
                            jw.StarryBg.init();
                        });
                    });
                }).swap();

                document.title = 'Starry Background | Playground';
                jw.Util.addMeta('description', 'A canvas example showcasing a starry background.');
                jw.Util.addMeta('keywords', 'canvas, html5');
                document.body.classList.add('playground', 'playInner', 'nav2');
            }
            else if(page === 'bCube') {
                that.load('/playground/breakdancing-cube.html', function(data) {
                    document.getElementById('cube').addEventListener('click', function(e) {
                        e.preventDefault();
                    });
                }).swap();

                document.title = 'Breakdancing Cube | Playground';
                jw.Util.addMeta('description', 'Pure CSS3 animation demo.');
                jw.Util.addMeta('keywords', 'CSS3, HTML5');
                document.body.classList.add('playground', 'playInner', 'bDancingCube', 'nav1');
            }

            var pNav = $('.dPlaygroundNav');
            if(!pNav.is(':visible')) {
                pNav.slideDown();
            }
        }
    };
})();
'use strict';

class PlaygroundController {
    index() {
        let pNav = document.querySelector('.hdr-nav2 .playground-nav-wrap');
        if(!pNav.classList.contains('visible')) {
            pNav.classList.add('visible');
        }

        jw.Router.load('/playground/index.html');

        document.title = 'Playground';
        jw.Util.addMeta('description', 'An playground area for web tech demos.');
        jw.Util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner');
    }

    ballPit() {
        jw.Router.load('/playground/ballPit.html', succeeded => {
            jw.Util.require('/assets/ballPit.js', () => {
                jw.BallPit = new BallPit();
            });
        });

        document.title = 'Ball Pit | Playground';
        jw.Util.addMeta('description', 'A canvas example showcasing a ball pit.');
        jw.Util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner', 'nav3');
    }

    starryBackground() {
        jw.Router.load('/playground/stars.html', succeeded => {
            jw.Util.require('/assets/stars.js', cached => {
                jw.StarryBg = new StarryBg();
            });
        });

        document.title = 'Starry Background | Playground';
        jw.Util.addMeta('description', 'A canvas example showcasing a starry background.');
        jw.Util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner', 'nav2');
    }

    breakdancingCube() {
        jw.Router.load('/playground/breakdancing-cube.html');

        document.title = 'Breakdancing Cube | Playground';
        jw.Util.addMeta('description', 'Pure CSS3 animation demo.');
        jw.Util.addMeta('keywords', 'CSS3, HTML5');
        document.body.classList.add('playground', 'playInner', 'break-dancing-cube', 'nav1');
    }
}

jw.PlaygroundController = new PlaygroundController();
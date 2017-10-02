'use strict';

class PlaygroundController {
    openNav() {
        let pNav = document.querySelector('.hdr-nav2 .playground-nav-wrap');
        if(!pNav.classList.contains('visible')) {
            pNav.classList.add('visible');
        }
    }

    index() {
        this.openNav();
        router.load('/playground/index.html');

        document.title = 'Playground';
        util.addMeta('description', 'An playground area for web tech demos.');
        util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner');
    }

    ballPit() {
        this.openNav();

        Promise.all([
            router.load('/playground/ballPit.html'),
            util.require('/assets/ballPit.js')
        ]).then(() => {
            window.ballPit = new BallPit();
        });

        document.title = 'Ball Pit | Playground';
        util.addMeta('description', 'A canvas example showcasing a ball pit.');
        util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner', 'nav3');
    }

    starryBackground() {
        this.openNav();

        Promise.all([
            router.load('/playground/stars.html'),
            util.require('/assets/stars.js')
        ]).then(() => {
            window.starryBg = new StarryBg();
        });

        document.title = 'Starry Background | Playground';
        util.addMeta('description', 'A canvas example showcasing a starry background.');
        util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner', 'nav2');
    }

    breakdancingCube() {
        this.openNav();
        router.load('/playground/breakdancing-cube.html');

        document.title = 'Breakdancing Cube | Playground';
        util.addMeta('description', 'Pure CSS3 animation demo.');
        util.addMeta('keywords', 'CSS3, HTML5');
        document.body.classList.add('playground', 'playInner', 'break-dancing-cube', 'nav1');
    }
}

window.playgroundController = new PlaygroundController();
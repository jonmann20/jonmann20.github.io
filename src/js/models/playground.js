'use strict';

class PlaygroundModel {
    render(that, page) {
        jw.Util.resetModel();
        this.ctx = that;

        switch(page) {
            case 'index':
                this.renderIndex();
                break;
            case 'ballPit':
                this.renderBallPit();
                break;
            case 'stars':
                this.renderStars();
                break;
            case 'bCube':
                this.renderBreakdancingCube();
                break;
        }

        let pNav = $('.dPlaygroundNav');
        if(!pNav.is(':visible')) {
            pNav.slideDown();
        }
    }
    
    renderIndex() {
        this.ctx.load('/playground/index.html', data => {}).swap();
    
        document.title = 'Playground';
        jw.Util.addMeta('description', 'An playground area for web tech demos.');
        jw.Util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner');
    }
    
    renderBallPit() {
        this.ctx.load('/playground/ballPit.html', data => {
            jw.Util.require('/js/ballPit.js', () => jw.BallPit.init());
        }).swap();

        document.title = 'Ball Pit | Playground';
        jw.Util.addMeta('description', 'A canvas example showcasing a ball pit.');
        jw.Util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner', 'nav3');
    }
    
    renderStars() {
        this.ctx.load('/playground/stars.html', data => {
            // TODO: load these async
            jw.Util.require('/js/plugins/jquery.star_bg.js', () => {
                jw.Util.require('/js/stars.js', cached => jw.StarryBg.init());
            });
        }).swap();

        document.title = 'Starry Background | Playground';
        jw.Util.addMeta('description', 'A canvas example showcasing a starry background.');
        jw.Util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner', 'nav2');
    }
    
    renderBreakdancingCube() {
        this.ctx.load('/playground/breakdancing-cube.html', data => {
            document.getElementById('cube').addEventListener('click', e =>
                e.preventDefault()
            );
        }).swap();

        document.title = 'Breakdancing Cube | Playground';
        jw.Util.addMeta('description', 'Pure CSS3 animation demo.');
        jw.Util.addMeta('keywords', 'CSS3, HTML5');
        document.body.classList.add('playground', 'playInner', 'bDancingCube', 'nav1');
    }
}

jw.PlaygroundModel = new PlaygroundModel();
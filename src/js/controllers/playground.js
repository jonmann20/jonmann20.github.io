'use strict';

class PlaygroundController {
    index() {
        let pNav = document.querySelector('.hdrNav2 .dPlaygroundNav');
        if(!pNav.classList.contains('visible')) {
            pNav.classList.add('visible');
        }
        
        jw.Router.grab('/playground/index.html', data => {
            jw.Router.swap(data);
        });
    
        document.title = 'Playground';
        jw.Util.addMeta('description', 'An playground area for web tech demos.');
        jw.Util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner');
    }
    
    ballPit() {
        jw.Router.grab('/playground/ballPit.html', data => {
            jw.Router.swap(data);
            
            jw.Util.require('/assets/ballPit.js', () => {
                jw.BallPit = new BallPit();
            });
        })

        document.title = 'Ball Pit | Playground';
        jw.Util.addMeta('description', 'A canvas example showcasing a ball pit.');
        jw.Util.addMeta('keywords', 'canvas, html5');
        document.body.classList.add('playground', 'playInner', 'nav3');
    }
    
    starryBackground() {
        jw.Router.grab('/playground/stars.html', data => {
            jw.Router.swap(data);
            
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
        jw.Router.grab('/playground/breakdancing-cube.html', data => {
            jw.Router.swap(data);
            
            document.getElementById('cube').addEventListener('click', e =>
                e.preventDefault()
            );
        });

        document.title = 'Breakdancing Cube | Playground';
        jw.Util.addMeta('description', 'Pure CSS3 animation demo.');
        jw.Util.addMeta('keywords', 'CSS3, HTML5');
        document.body.classList.add('playground', 'playInner', 'bDancingCube', 'nav1');
    }
}

jw.PlaygroundController = new PlaygroundController();
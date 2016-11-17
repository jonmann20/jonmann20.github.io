'use strict';

class Util {
    constructor() {
        this.main = document.querySelector('.main');
        this.jsSrcHash = {
            // src: id
            'https://platform.twitter.com/widgets.js': false,
            '/js/plugins/jquery.cycle.lite.js': false,
            '/js/plugins/jquery.listCarousel.js': false,
            '/assets/stars.js': false,
            '/assets/ballPit.js': false
        };
    }

    require(src, callback) { // callback(cached)
        if(!this.jsSrcHash[src]) {
            $.ajax({
                url: src,
                dataType: 'script',
                success: data => {
                    this.jsSrcHash[src] = true;
                    callback(false);
                }
            });
        }
        else {
            callback(true);
        }
    }

    getYear() {
        return new Date().getFullYear();
    }

    resetModel() {
        this.main.innerHTML = '';

        if(jw.Routing.lastPg === 'ballPit') {
            jw.BallPit.destroy();
            delete jw.BallPit;
        }
        else if(jw.Routing.lastPg === 'stars') {
            jw.StarryBg.destroy();
            delete jw.StarryBg;
        }

        document.body.className = '';
        document.title = '';
        
        const description = document.head.querySelector('meta[name=description]');
        const keywords = document.head.querySelector('meta[name=keywords]');
        const robots = document.head.querySelector('meta[name=robots]');
        if(description) {
            document.head.removeChild(description);
        }
        
        if(keywords) {
            document.head.removeChild(keywords);
        }
        
        if(robots) {
            document.head.removeChild(robots);
        }
        
        // if page not playground inner
        let h = window.location.hash;
        if(typeof(h) === 'undefined' || h.indexOf('#playground') !== 0) {  // startsWith
            let pNavs = document.querySelectorAll('.dPlaygroundNav');
            pNavs.forEach(pNav => {
                if(pNav.classList.contains('visible')) {
                    pNav.classList.remove('visible');
                    $(pNav).slideUp();
                }    
            });
        }
    }
    
    addMeta(name, content) {
        let meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
    }
}

jw.Util = new Util();
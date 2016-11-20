'use strict';

class Util {
    constructor() {
        this.main = document.querySelector('.main');
        this.jsSrcHash = {
            // src: id
            'https://platform.twitter.com/widgets.js': false,
            '/assets/list-carousel.js': false,
            '/assets/stars.js': false,
            '/assets/ballPit.js': false
        };
    }

    require(src, callback) { // callback(cached)
        if(!this.jsSrcHash[src]) {
            let script = document.createElement('script');
            script.src = src;
            script.async = 1;
            
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(script, firstScriptTag);
            
            script.onload = () => {
                this.jsSrcHash[src] = true;
                callback(false);    
            };
        }
        else {
            callback(true);
        }
    }

    getYear() {
        return new Date().getFullYear();
    }

    resetController() {
        this.main.innerHTML = '';

        if(jw.Router.lastPg === 'ballPit') {
            jw.BallPit.destroy();
            delete jw.BallPit;
        }
        else if(jw.Router.lastPg === 'stars') {
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
            let pNav = document.querySelector('.hdrNav2 .dPlaygroundNav');
            if(pNav.classList.contains('visible')) {
                pNav.classList.remove('visible');
            }
        }
    }
    
    addMeta(name, content) {
        let meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
    }
    
    getMainWidth() {
        const main = document.querySelector('.main');
        const mainStyles = window.getComputedStyle(main, null);
        const paddingLeft = parseFloat(mainStyles.getPropertyValue('padding-left'));
        return main.getBoundingClientRect().width - paddingLeft;
    }
}

jw.Util = new Util();
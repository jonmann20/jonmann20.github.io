'use strict';

class Util {
    constructor() {
        this.jsSrcHash = {
            // src: id
            'https://platform.twitter.com/widgets.js': false,
            '/assets/listCarousel.js': false,
            '/assets/stars.js': false,
            '/assets/ballPit.js': false
        };
    }

    require(src, callback) { // callback(cached)
        return new Promise((resolve, reject) => {
            if(!this.jsSrcHash[src]) {
                let script = document.createElement('script');
                script.src = src;
                script.async = 1;

                let firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(script, firstScriptTag);

                script.onload = () => {
                    this.jsSrcHash[src] = true;
                    resolve();
                };

                script.onerror = () => {
                    reject();
                };
            }
            else {
                resolve();
            }
        });
    }

    addMeta(name, content) {
        let meta = document.createElement('meta');
        meta.setAttribute('name', name);
        meta.setAttribute('content', content);
        document.head.appendChild(meta);
    }

    getMainWidth() {
        const main = document.querySelector('main');
        const mainStyles = window.getComputedStyle(main, null);
        const paddingLeft = parseFloat(mainStyles.getPropertyValue('padding-left'));
        return main.getBoundingClientRect().width - paddingLeft;
    }
}

window.util = new Util();
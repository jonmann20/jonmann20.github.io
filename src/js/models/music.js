'use strict';

jw.MusicModel = (() => {
    const year = jw.Utils.getYear();

    return {
        render: (that, page) => {
            jw.Utils.resetModel();

            switch(page) {
                case 'index':
                    that.load('/music/index.html', data => {
                        $('.teaching').text(year - 2008);
                        $('.playing').text(year - 1994);
                    }).swap();

                    document.title = 'Music';
                    jw.body.addClass('music musicHome');
                    break;
                case 'bass':
                    that.load('/music/bass.html', data => {
                        $('.playing').text(year - 2009);
                    }).swap();

                    document.title = 'Bass | Music';
                    jw.body.addClass('music bass');
                    break;
                case 'chiptunes':
                    that.load('/music/chiptunes.html', data => {}).swap();

                    document.title = 'Chiptunes | Music';
                    jw.body.addClass('music');
                    break;
                case 'guitar':
                    that.load('/music/guitar.html', data => {
                        $('.playing').text(year - 2002);
                    }).swap();

                    document.title = 'Guitar | Music';
                    jw.body.addClass('music');
                    break;
                case 'mandolin':
                    that.load('/music/mandolin.html', data => {
                        $('.playing').text(year - 2008);
                    }).swap();

                    document.title = 'Mandolin | Music';
                    jw.body.addClass('music mandolin');
                    break;
                case 'piano':
                    that.load('/music/piano.html', data => {
                        $('.playing').text(year - 1994);
                    }).swap();

                    document.title = 'Piano | Music';
                    jw.body.addClass('music');
                    break;
                case 'trumpet':
                    that.load('/music/trumpet.html', data => {
                        $('.playing').text(year - 1998);
                    }).swap();

                    document.title = 'Trumpet | Music';
                    jw.body.addClass('music trumpet');
                    break;
                case 'rates':
                    that.load('/music/rates.html', data => {}).swap();

                    document.title = 'Rates | Music';
                    jw.head.append(`<meta name="description" content="Music Lesson Rates">
                                   <meta name="robots" rel="none">`
                    );
                    jw.body.addClass('music rates');
                    break;
                case 'voice':
                    that.load('/music/voice.html', data => {
                        $('.playing').text(year - 2009);
                    }).swap();

                    document.title = 'Voice | Music';
                    jw.body.addClass('music');
                    break;
            }
        }
    };
})();

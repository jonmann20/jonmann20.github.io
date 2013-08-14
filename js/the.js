var Master = (function () {

    function hoverEvents() {

    }


    // public
    return {

        init: function () {

            if (this.isTouchDevice()) {

                $('.absHover .colL ul').css({ listStyleType: 'none' });
                $('.absHover .colL ul a').addClass('bigBtn');

                $('.absHover .colR > div').css({
                    display: 'block',
                    position: 'static',
                    width: '100%',
                    marginBottom: 45
                })

                $('.absHover .colR #divDefault').hide()

                $('footer').css({
                    padding: '10px 0 8px',
                    bottom: 0
                })
            }

        },

        isTouchDevice: function () {
            return !!('ontouchstart' in window) 		// works on most browsers 
      			|| !!('onmsgesturechange' in window) 	// works on ie10
        }

    }
})();

$(function(){
	Master.init()
})

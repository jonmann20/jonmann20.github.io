;(function($){
	$.fn.hoverCarousel = function(options) {
		
		function fixFirstLetter(str, lower){
			if(typeof(lower) !== "undefined")
				return str.charAt(0).toLowerCase() + str.slice(1);
			else
				return str.charAt(0).toUpperCase() + str.slice(1);
		}
		
		options = $.extend({}, $.fn.hoverCarousel.defaultOptions, options);
		var overID,
            active = fixFirstLetter(options.active);
		
		//$(this).find("a:not(.bigBtn)").hoverIntent({			
		//	over: function(){
		//		overID = fixFirstLetter($(this).attr("id"));

        //        // hide old
		//		if (active != overID) {
		//		    $("#div" + active).fadeOut(options.speedOut);
		//		    $("#div" + overID).fadeIn(options.speedIn);
		//		}

      	//	},
		//    timeout: 0,
		//    out: function(){
		//        active = overID;        // keep new
		//    }
		//});



		$(this).find("a:not(.bigBtn)").on("click", function (e) {    
		    overID = fixFirstLetter($(this).attr("id"));

		    if (active != overID) {
		        e.preventDefault();

		        var fixedActive = fixFirstLetter(active, true);

		        console.log(fixedActive);

		        $('#' + fixedActive).children(".icon-link").remove();
		        $(this).append(" <span class='icon-link'></span>");

		        $("#div" + active).fadeOut(options.speedOut);
		        $("#div" + overID).fadeIn(options.speedIn);

		        active = overID;
		    }
		});

	}
	
	$.fn.hoverCarousel.defaultOptions = {
	    speedOut: 300,
        speedIn: 450,
		active: "default"
	}
	
})(jQuery);

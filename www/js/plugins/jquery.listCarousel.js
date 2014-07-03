;(function($){
	$.fn.listCarousel = function(options) {
		function fixFirstLetter(str, lower){
			if(typeof(lower) !== "undefined")
				return str.charAt(0).toLowerCase() + str.slice(1);
			else
				return str.charAt(0).toUpperCase() + str.slice(1);
		}
		
		options = $.extend({}, $.fn.listCarousel.defaultOptions, options);
		var overID,
            active = fixFirstLetter(options.active);

		return $(this).find("a:not(.bigBtn)").on("click", function (e) {    
		    overID = fixFirstLetter($(this).attr("id"));

		    if (active != overID) {
		        e.preventDefault();

		        var fixedActive = fixFirstLetter(active, true);

		        $(".main").find('#' + fixedActive).children(".icon-link").remove();
		        $(this).append(" <span class='icon-link'></span>");

		        $("#div" + active).fadeOut(options.speedOut);
		        var div = $("#div" + overID).fadeIn(options.speedIn);

		        jw.Main.fixColRHeight(div.height());

		        active = overID;
		    }
		});
	}
	
	$.fn.listCarousel.defaultOptions = {
	    speedOut: 300,
        speedIn: 450,
		active: "default"
	}
	
})(jQuery);

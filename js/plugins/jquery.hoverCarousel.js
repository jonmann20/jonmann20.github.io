;(function($){
	
	$.fn.hoverCarousel = function(options) {
		
		function fixFirstLetter(str, lower){
			
			if(typeof(lower) !== 'undefined')
				return str.charAt(0).toLowerCase() + str.slice(1);
			else
				return str.charAt(0).toUpperCase() + str.slice(1);
				
		}
		
		options = $.extend({}, $.fn.hoverCarousel.defaultOptions, options);
		var active = fixFirstLetter(options.active);
		
		
		function hideOld(id){
			
			if(active != id){
				$('#div' + active).fadeOut(options.speed);
				$('#div' + id).fadeIn(options.speed);
			}
		
		}
		
		function keepNew(id){
			active = id;
		}
		
		
		//$(this).append('<a href="#" class="bigBtn">Next</a>');
		
		var that = $(this);
		var overID;
		
		$(this).find('a:not(.bigBtn)').hoverIntent({			
			over: function(){
				overID = fixFirstLetter($(this).attr('id'));
		   	 	hideOld(overID);
      		},
		    timeout: 0,
		    out: function(){
		    	keepNew(overID);
		    }
	     });
	     
	     
/*
	     $(this).find('.bigBtn').on('click', function(e){
	     	e.preventDefault();
	     	
			var id;
			var cur = '#' + fixFirstLetter(active, true);
			
			if(cur == '#default'){
				id = that.children('li').first().children('a').attr('id');
			}
			else if(!$(cur).parent().next().is('li')) {
				id = 'default';
			}
			else {
				id= $(cur).parent().next().children('a').attr('id');
			}
			
			id = fixFirstLetter(id);
			hideOld(id);
			keepNew(id);
	     });*/

	}
	
	
	$.fn.hoverCarousel.defaultOptions = {
		speed: 250,
		active: 'default'
	}
	
	
})(jQuery);

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
		
		
		$(this).append('<a href="#" class="bigBtn">Next</a>');
		
		var that = $(this);
		
		$(this).find('a').hoverIntent({			
			over: function(){
				
				var id;
				
				if($(this).hasClass('bigBtn')){
					
					var cur = '#' + fixFirstLetter(active, true);
					
					console.log(cur);
					
					if(cur == '#default'){
						id = that.children('li').first().children('a').attr('id');
					}
					else {
						id = $(cur).parent().next().children('a').attr('id')
					}
					
					id = fixFirstLetter(id);
				}
				else {
					id = fixFirstLetter($(this).attr('id'));
		   	 	}
		   	 	
		   	 	console.log(id)
		   	 	
		   	 	hideOld(id);
		   	 	
      		},
		    timeout: 0,
		    out: function(){
		    	var id = fixFirstLetter($(this).attr('id'));
		    	keepNew(id);
		    }
	     });
	}
	
	
	$.fn.hoverCarousel.defaultOptions = {
		speed: 250,
		active: 'default'
	}
	
	
})(jQuery);

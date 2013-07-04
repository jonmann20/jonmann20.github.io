GameItem = function(){
	
	var parentDraw = null
	
	function _draw(){
		return function(){
			if(this.visible && !this.collected){
				parentDraw.apply(this)
			}
			
		}
	}
	
	
	return {
		collected: false,
		val: -1,
		visible: true,
		
		init: function(g, v, vis){
			$.extend(this, g)
			
			this.val = v
			
			if(typeof(vis) !== 'undefined')
				this.visible = vis
			
			
			parentDraw = this.draw
			this.draw = _draw()	
		}
		
	}
}


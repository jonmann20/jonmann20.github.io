/*GameItem = function(){
	return {
		
	}
}*/


Sack = function(){
	return {
		collected: false,
		val: -1,
		
		init: function(g, v){
			$.extend(this, g)
			this.val = v
		}
	}
}


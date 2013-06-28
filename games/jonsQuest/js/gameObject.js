GameObject = function(){
	var img = null,
		ready = false
	
	return {
		initX: -1,
		x: -1,
		initY: -1,
		y: -1,
		w: -1,
		h: -1,
		
		init: function(xx, yy, ww, hh){
			this.initX = this.x = xx
			this.intiY = this.y = yy
			this.w = ww
			this.h = hh	
		},
		
		
		draw: function(){
			if(ready){
				ctx.drawImage(img, this.x, this.y)
			}
			else {
				ctx.fillStyle = "red"
				ctx.fillRect(this.x, this.y, this.w, this.h)
			}
		}
	}
}
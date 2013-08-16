/*print_r = function(name) {// can handle 3 lvls of nested arrays or objects
	var obj = window[name]
	
	var tmp;
	for (var i in obj) {
		if ( typeof obj[i] === 'object') {
			tmp += name + "." + i + ' = {<br />'

			for (var j in obj[i]) {
				tmp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + j + ' = '

				if ( typeof obj[i][j] === 'object') {
					tmp += ' {<br />'

					for (var k in obj[i][j]) {
						tmp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + k + ' = ' + obj[i][j][k] + '<br />'
					}

					tmp += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}<br />'
				} else
					tmp += obj[i][j] + '<br />'
			}

			tmp += '}<br />'
		} else
			tmp += name + "." + i + " = " + obj[i] + "<br />"

		tmp = tmp.replace("undefined", "")
		
		// remove unwanted opening undefined
		$(".debug").html(tmp)
	}
}


		// 8 versions over original each with 1/8 of full opacity (square filter)
		blur : function(numPasses, callback) {
			ctx.globalAlpha = 0.125;
			for (var i = 1; i <= numPasses; i++) {
				for (var y = -1; y < 2; y++) {
					for (var x = -1; x < 2; x++) {
						callback(x, y)
					}
				}
			}
			ctx.globalAlpha = 1.0
		} 

*/
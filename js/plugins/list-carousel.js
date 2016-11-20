class ListCarousel {
	constructor(list) {
	    this.speedOut = 300;
	    this.speedIn = 450;
		this.active = 'default';
		this.overID = null;
		
		let links = list.querySelectorAll('a');
		links.forEach(link => {
			link.addEventListener('click', e => {
				console.log(e, e.target, e.target.id);
			});
		});
		

	    // this.overID = this.fixFirstLetter($(this).attr('id'));

	    // if(this.active != this.overID) {
	    //     e.preventDefault();

	    //     let fixedActive = this.fixFirstLetter(this.active, true);

	    //     $('.main').find(`#${fixedActive}`).children('.icon-link').remove();
	    //     $(this).append(' <span class="icon-link"></span>');

	    //     $(`#div${this.active}`).fadeOut(this.speedOut);
	    //     //let div = $(`#div${this.overID}`).fadeIn(this.speedIn);
	    //     //jw.Main.fixColRHeight(div.height());

	    //     this.active = this.overID;
	    // }
	}
        
    fixFirstLetter(str, lower){
		if(typeof(lower) !== 'undefined') {
			return str.charAt(0).toLowerCase() + str.slice(1);
		}
		else {
			return str.charAt(0).toUpperCase() + str.slice(1);
		}
	}
}
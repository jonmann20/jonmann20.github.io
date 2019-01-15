class PlaygroundController {
	static get pNav() {
		return document.querySelector('head-er').shadowRoot.querySelector('.hdr-nav2 .playground-nav-wrap');
	}

	static handleSubNav() {
		addEventListener('route', e => {
			const slug = e.detail;
			if(!slug.includes('playground')) {
				PlaygroundController.closeNav();
			}
		}, {passive: true});
	}

	static openNav() {
		if(!PlaygroundController.pNav.classList.contains('visible')) {
			PlaygroundController.pNav.classList.add('visible');
		}
	}

	static closeNav() {
		if(PlaygroundController.pNav.classList.contains('visible')) {
			PlaygroundController.pNav.classList.remove('visible');
		}
	}
}

export default PlaygroundController;
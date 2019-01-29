const routes = {
	home: 'page-home',
	games: 'page-games',
	playground: 'page-playground',
	'playground/ball-pit': 'page-ball-pit',
	'playground/breakdancing-cube': 'page-breakdancing-cube',
	'playground/starry-background': 'page-starry-background',
	portfolio: 'page-portfolio'
};

class Router {
	static route(slug) {
		slug = slug.substring(1);
		Router.resetController(slug);

		// TODO: use redux?
		window.selectedPage = slug;
		document.querySelector('head-er').setAttribute('selectedPage', slug);
		document.querySelector('a-side').setAttribute('selectedPage', slug);

		const r = routes[slug] ? routes[slug] : routes.home;
		this.loadComponent(r);
	}

	static async loadComponent(name) {
		if(await import(/* webpackChunkName: "[index]-[request]" */ `../elts/${name}.js`)) {
			document.querySelector('main').innerHTML = `<${name}></${name}>`;
		}
	}

	static rmMeta(query) {
		const tag = document.head.querySelector(query);
		if(tag) {
			document.head.removeChild(tag);
		}
	}

	static resetController(slug) {
		scrollTo(0, 0);
		document.querySelector('main').innerHTML = '';
		document.title = '';
		Router.rmMeta('meta[name=description]');
		Router.rmMeta('meta[name=keywords]');

		window.dispatchEvent(new CustomEvent('route', {detail: slug}));
	}
}

// Start router
window.onhashchange = () => Router.route(location.hash);

WebComponents.waitFor(() => {
	// TODO: concat
	// NOTE: should also wait for elements loaded and firstUpdated?
	import('../elts/i-con.js');
	import('../elts/head-er');
	import('../elts/a-side');

	// Show page
	Router.route(location.hash);
});

if(!window.isDev) {
	// Load service worker
	navigator.serviceWorker.register('sw.js');

	// Load analytics
	import('./prd.js');
}
class Util {
	static require(src) {
		return new Promise((resolve, reject) => {
			if(!Util.constructor._jsSrc.includes(src)) {
				let script = document.createElement('script');
				script.src = src;
				script.async = 1;

				document.head.appendChild(script);

				script.onload = () => {
					Util.constructor._jsSrc.push(src);
					resolve();
				};

				script.onerror = () => reject();
			}
			else {
				resolve();
			}
		});
	}

	static addMeta(name, content) {
		let meta = document.createElement('meta');
		meta.setAttribute('name', name);
		meta.setAttribute('content', content);
		document.head.appendChild(meta);
	}

	static addLink(rel, href, crossorigin = true) {
		let link = document.createElement('link');
		link.setAttribute('rel', rel);
		link.setAttribute('href', href);

		if(crossorigin) {
			link.setAttribute('crossorigin', '');
		}

		document.head.appendChild(link);
	}

	static get getMainWidth() {
		const main = document.querySelector('main');
		const mainStyles = window.getComputedStyle(main, null);
		const paddingLeft = parseFloat(mainStyles.getPropertyValue('padding-left'));
		return main.getBoundingClientRect().width - paddingLeft;
	}
}
Util.constructor._jsSrc = [];

export default Util;
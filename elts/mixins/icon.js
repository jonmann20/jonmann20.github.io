const IconMixin = superClass => class extends superClass {
	static get properties() {
		return {
			iconsVisible: {type: Boolean}
		};
	}

	get iconsVisible() {
		console.log('icon.js', window.loaded);
		return window.loaded;
	}
};

export default IconMixin;
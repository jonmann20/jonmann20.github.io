const Mixin = superClass => new MixinBuilder(superClass);

class MixinBuilder {
	constructor(superClass) {
		this.superClass = superClass;
	}

	with(...mixins) {
		return mixins.reduce((c, mixin) => mixin(c), this.superClass);
	}
}

export default Mixin;
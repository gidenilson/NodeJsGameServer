module.exports = function (p) {
	if (this.prop.hasOwnProperty(p)) {
		return this.prop[p];
	}
};


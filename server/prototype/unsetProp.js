module.exports = function (p) {
	if (this.prop.hasOwnProperty(p)) {
		delete this.prop[p];
	}
};


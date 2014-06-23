module.exports = function (p, v) {
	if (typeof p === 'string') {
		this.prop[p] = v;
	}
};


module.exports = function () {
	var i,
	result = [];
	for (i = 0; i < this.clients.length; i += 1) {
		result.push(this.clients[i].uid);
	}
	return result;
};


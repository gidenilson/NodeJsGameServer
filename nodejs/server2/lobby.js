var lobby = function () {
	var place = require('./place');
	var lobby = new place('lobby');

	return lobby;
};

module.exports = lobby;

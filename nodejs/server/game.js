module.exports = function () {
	var clients,
	addClient;

	clients = [];
	// Adiciona cliente no jogo
	addClient = function (c) {
		clients.push(c);
	};
	return { addClient: addClient};
}();

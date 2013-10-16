module.exports = function () {
	var clients = [],
	    exists,
	    addClient,
	    removeClient,
		importFrom,
		exportTo,
	    count,
	    clientById;
	
	// Verifica se cliente já existe
	exists = function (client) {
		return clients.indexOf(client) >= 0;
	};
	// Adiciona cliente
	addClient = function (client) {
		if (!exists(client)) {
			clients.push(client);
		}
	};
	// Remove cliente
	removeClient = function (client) {
		var index = clients.indexOf(client);
		if (index >= 0) {
			clients.splice(index, 1);
		}
	};
	// Conta clientes
	count = function () {
		return clients.length;
	};

	// Retorna cliente por ID
	clientById = function (id) {
		var i;
		for (i = 0; i < clients.lenght; i += 1) {
			if (clients[i].id === id) {
				return clients[i];
			}
		}
		return false;
	};

	// Retorna interface pública
	return {
		addClient : addClient,
		removeClient : removeClient,
		count : count,
		clientById : clientById,
		exists : exists
	};
}();

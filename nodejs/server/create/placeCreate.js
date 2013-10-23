module.exports = (function () {
	var uid = 0,
		objectType = "place";

	return function (t) {
		var title = t,
		clients = [],
		exists,
		addClient,
		removeClient,
		getClients,
		count,
		clientById;
		uid += 1;
		// Verifica se cliente já existe
		exists = function (client) {
			return clients.indexOf(client) >= 0;
		};
		// Adiciona cliente
		addClient = function (client) {
			var list = [];
			// Envia mensagem aos outros
			if (!exists(client)) {
				for (key in clients) {
					clients[key].send('{"in" : "' + client.uid + '"}');
					list.push(clients[key].uid);
				}
			// Envia lista de clientes que já estão no place
			client.send('{"list : ' + JSON.stringify(list) + '"}');
			clients.push(client);
			}
		};
		// Remove cliente
		removeClient = function (client) {
			var index = clients.indexOf(client);
			if (index >= 0) {
				clients.splice(index, 1);
				for (key in clients) {
					if (clients[key] != client) {
						clients[key].send('{"out" : "' + client.uid + '"}');
					}
				}
			}
		};
		// Conta clientes
		count = function () {
			return clients.length;
		};
		// Retorna titulo
		getTitle = function () {
			return title;
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
		
		// Retorna array de clientes
		getClients = function () {
			return clients;
		};

		return {
			uid : uid,
			objectType : objectType,
			getClients : getClients,
			getTitle : getTitle,
			addClient : addClient,
			removeClient : removeClient,
			count : count,
			clientById : clientById,
			exists : exists
		};
	};
}());

module.exports = (function () {
	// Inicializa objetos
	var limbo,
		objectType = "mediator",
		patio,
		houses = [],
		rooms = [],
		onData,
		onClose,
		startClient,
		login,
		transferTo;
	// Trata recebimento de dados
	onData = function (client, data) {
		var jdata,
			cmdLogin = require('./command/login'),
		    cmdData = require('./command/data'),
			cmdList = require('./command/list');
		try {
			jdata = JSON.parse(data.toString());
			cmdLogin(client, jdata);
		    cmdData(client, jdata);
			cmdList(client, jdata);
						
		} catch (err) {
			client.send('{"error" : "invalid json"}');
			console.log("erro no JSON recebido");
			console.log(err);
		}
	};
	// Trata sa�da do cliente
	onClose = function (client) {
		client.place.removeClient(client);
	};
	// Inicia os eventos do novo cliente
	startClient = function (client, mediator) {

		client.mediator = mediator;
		client.socket.on('message', function (data) {
			onData(client, data);
		});
		client.socket.on('close', function (error) {
			onClose(client);
		});

	};
	// Transfere cliente para outro place
	transferTo = function (client, place) {
		// Remove cliente do place anterior
		if (client.place) {
			client.place.removeClient(client);
		}

		// Adiciona cliente ao novo place
		place.addClient(client);
		client.place = place;
		console.log("client " + client.uid + " transferred to " + place.getTitle());
	};

	// Retorna interface p�blica
	return {
		startClient : startClient,
		patio : patio,
		limbo : limbo,
		transferTo : transferTo
	};
}());

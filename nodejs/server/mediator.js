module.exports = function () {
	// Inicializa objetos
	var limbo,
	    patio,
		houses = [],
	    rooms = [],	
		onData,
		onClose,
		login,
		transferTo,
		that = this;
	// Trata recebimento de dados
	onData = function (client, data) {
		var jdata,
			cmdLogin = require('./command/login'),
			cmdData = require('./command/data');
		//try {
			jdata = JSON.parse(data.toString());
			cmdLogin(client, jdata);
			cmdData(client, jdata);			
			
		//} catch (err) {
			//console.log(err);
		//}
		//console.log(client.uid + " diz " + data.toString());

	};
	// Trata saída do cliente
	onClose = function (client) {

		console.log(client.uid + " desconectou");
	};
	// Inicia os eventos do novo cliente
	startClient = function (client, mediator) {
		
		client.mediator = mediator;
		client.socket.on('data', function (data) {
			onData(client, data);
		});
		client.socket.on('close', function (error) {
			onClose(client);
		});

	};
	// Transfere cliente para outro place
	transferTo = function(client, place){
		// Remove cliente do place anterior
		if(client.place){
			client.place.removeClient(client);
		}
		
		// Adiciona cliente ao novo place
		place.addClient(client);
		client.place = place;
	};

	// Retorna interface pública
	return {
		startClient : startClient,
		patio : patio,
		limbo : limbo,
		transferTo : transferTo
	};
}();

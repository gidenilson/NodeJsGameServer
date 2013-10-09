
var Patiohandlers = require('./patiohandlers');
var Patio = require('./place');
var House = require('./place');
var Room = require('./place');
var Game = require('./game');
var Net = require('net');


var clients = [];

var MY_APP = {
	init : function () {
		// Inicia servidor TCP
		Net.createServer(function (socket) {

			// Identifica cliente
			socket.name = socket.remoteAddress + ":" + socket.remotePort;

			// Adiciona Handlers do pátio
			Patio.setHandlers(Patiohandlers);
			// Adiciona cliente no pátio
			Patio.addClient(socket);

		}).listen(5000, '127.0.0.1');
		console.log("Chat server running at port 5000\n");
	}

};
MY_APP.init();

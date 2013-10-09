
var Patiohandlers = require('./patiohandlers');
var Patio = require('./place');
var House = require('./place');
var Room = require('./place');
var Game = require('./game');
// Load the TCP Library
var net = require('net');

// Keep track of the chat clients
var clients = [];

// Start a TCP Server
net.createServer(function (socket) {

	// Identify this client
	socket.name = socket.remoteAddress + ":" + socket.remotePort;
	console.log(socket.name);

	// Put this new client in the list
	Patio.setHandlers(Patiohandlers);
	clients.push(socket);
	Patio.addClient(socket);
	Game.addClient(socket);
	
	
	

	// Send a nice welcome message and announce
	socket.write("Welcome " + socket.name + "\n");
	broadcast(socket.name + " joined the chat\n", socket);

	// Handle incoming messages from clients.
	/*
	socket.on('data', function (data) {
	var m = JSON.parse(data.toString());
	console.log(m.msg);

	broadcast(socket.name + "> " + data, socket);
	});
	 */

	 /*
	socket.on('data', callbacks.data);
	socket.removeListener('data', callbacks.data);
	socket.on('data', callbacks.data2);
	*/

	// Remove the client from the list when it leaves
	socket.on('end', function () {
		clients.splice(clients.indexOf(socket), 1);
		broadcast(socket.name + " left the chat.\n");
	});

	// Send a message to all clients
	function broadcast(message, sender) {
		clients.forEach(function (client) {
			// Don't want to send it to sender
			if (client === sender)
				return;
			client.write(message);
		});
		// Log it to the server output too
		process.stdout.write(message)
	}

}).listen(5000, '127.0.0.1');

// Put a friendly message on the terminal of the server.
console.log("Chat server running at port 5000\n");

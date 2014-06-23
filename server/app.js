var MY_APP = {

	mediator : require('./mediator'),
	clientCreate : require('./create/clientCreate'),
	placeCreate : require('./create/placeCreate'),
	WebSocketServer : require('ws').Server

};

MY_APP.init = function () {
console.log(Client);
	var ws = new this.WebSocketServer({
			port : 80
		});

	// Inicia conexão de jogo
	ws.on('connection', function (socket) {
		
		socket.on('message', function (message) {
			console.log('received:', message);
			socket.send('received:' + message);
		});
		socket.on('close', function(code){
			console.log(code);
		});
	});

};

MY_APP.init();

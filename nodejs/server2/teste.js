var MY_APP = {
	
	client : require('./client'),	
	//lobby : require('./lobby'),
	WebSocketServer : require('ws').Server,
	http : require('http'),
	httpServer : null,
	clients : [],
	server : require('./server')
	

};

MY_APP.init = function () {
	var ws, that = this;
	
	this.loadLobby('Corrida Espacial');
	this.loadLobby('Mundo das Letras');
	//console.log(this.server.contents);
	
	ws = new this.WebSocketServer({
			port : 8080
		});

	// Inicia conexão de jogo
	ws.on('connection', function (socket) {
		var guest = new that.client(socket);
		
		//guest.place = that.server;
		that.server.addClient(guest);
		that.clients.push(guest);
	});
	
	

};
MY_APP.loadLobby = function(n){
	var lobby = this.server.createContent();
	lobby.setProp('name', n);	
};

MY_APP.init();

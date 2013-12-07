var MY_APP = {

	mediator : require('./mediator'),
	clientCreate : require('./create/clientCreate'),
	placeCreate : require('./create/placeCreate'),
	WebSocketServer : require('ws').Server

};

MY_APP.init = function () {
	var that = this,
        socket = new this.WebSocketServer({port: 5000});
	this.mediator.patio = this.placeCreate('patio');
	this.mediator.limbo = this.placeCreate('limbo');

	// Inicia conexão de jogo
	socket.on('connection', function (socket) {
		that.initClient(socket);
    });
};

MY_APP.initClient = function (socket) {
	// Cria objeto client a partir do socket TCP
	var client = this.clientCreate(socket);
	
	// Configura mediator no cliente
	this.mediator.startClient(client, this.mediator);
	
	// Envia cliente para o limbo
	this.mediator.transferTo(client, this.mediator.limbo);

	
	
};
MY_APP.init();

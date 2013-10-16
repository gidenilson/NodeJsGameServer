var MY_APP = {
	net : require('net'),
	mediator : require('./mediator'),
	clientCreate : require('./clientCreate'),
	limbo : require('./place'),
	patio : require('./place')

};
MY_APP.init = function () {
	var that = this;
	this.mediator.patio = this.patio;
	this.mediator.limbo = this.limbo;
	
	// Inicia conexão de jogo
	this.net.createServer(function (socket) {
		that.initClient(socket);
	}).listen(5000, '127.0.0.1');
	console.log("Chat server running at port 5000\n");
	
	// Inicia conexão de admin
	this.net.createServer(function (socket) {
		console.log(that.mediator.clients);
	}).listen(8000, '127.0.0.1');
};
MY_APP.initClient = function (socket) {
	// Cria objeto client a partir do socket TCP
	var client = this.clientCreate(socket);
	
	
	
	// Configura mediator no cliente
	this.mediator.startClient(client, this.mediator);
	
	// Envia cliente para o limbo
	this.mediator.transferTo(client, this.limbo);	
	
	console.log(client.place);
	
	
};
MY_APP.init();

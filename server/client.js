var uid = 0;
var Client = function (s) {
	var that = this;
	this.class = 'Client';
	uid += 1;
	this.uid = uid;
	this.locked = false;
	this.socket = s;
	this.prop = {};
	this.action = action;
	this.place = null;
	this.socket.on('message', function (data) {

		try {
			that.exec(data);
		} catch (e) {
			console.log(e);
			that.socket.send(JSON.stringify(e));
		}

	});
	this.socket.on('close', function (data) {
		that.close(data);
	});
};
/**
ações do cliente
 */
var action = {};

action.getProp = function (client, data) {
	var i,
	result = {
		c : data.c,
		p : {}

	};

	if (typeof data.p === 'undefined') {
		result.p = client.prop;
	} else {
		for (i = 0; i < data.p.length; i += 1) {
			if (client.prop.hasOwnProperty(data.p[i])) {
				result.p[data.p[i]] = client.prop[data.p[i]];
			}
		}
	}
	client.socket.send(JSON.stringify(result));

};
action.setProp = function (client, data) {
	var p,
	result = {};
	for (p in data.p) {
		if (data.p.hasOwnProperty(p)) {
			client.setProp(p, data.p[p]);
		}

	}
	result.c = data.c;
	client.socket.send(JSON.stringify(result));
};

action.unsetProp = function (client, data) {
	var i;

	if (typeof data.p === 'undefined') {
		client.prop = {};
	} else {
		for (i = 0; i < data.p.length; i += 1) {
			if (client.prop.hasOwnProperty(data.p[i])) {
				delete client.prop[data.p[i]];
			}
		}
	}
	client.socket.send(JSON.stringify(data.c));

};

action.getInfo = function (client, data) {
	var info = {
		c : data.c,
		p : client.abstract()
	};
	client.socket.send(JSON.stringify(info));

};

action.lock = function (client, data) {
	client.locked = true;
	client.socket.send(JSON.stringify(data.c));

};

action.unlock = function (client, data) {
	client.locked = false;
	client.socket.send(JSON.stringify(data.c));

};

/**
define uma propriedade
 */
Client.prototype.setProp = function (p, v) {
	if (typeof p === 'string') {
		this.prop[p] = v;
	}
};

/**
retorna uma propriedade
 */
Client.prototype.getProp = function (p) {
	if (this.prop.hasOwnProperty(p)) {
		return this.prop[p];
	}
};

/**
remove uma propriedade
 */
Client.prototype.unsetProp = function (p) {
	if (this.prop.hasOwnProperty(p)) {
		delete this.prop[p];
	}
};

/**
envia mensagem
 */
Client.prototype.sendMessage = function (data) {
	var i,
	msg = {
		msg : data.send,
		uid : this.uid

	},
	clients = this.place.clients,
	l;
	if (typeof data.uid === 'undefined') { //envia para todos
		l = clients.length;
		for (i = 0; i < l; i += 1) {
			if (this.uid !== clients[i].uid) { //não envia para o remetente
				clients[i].socket.send(JSON.stringify(msg));
			}

		}
	} else { //envia para selecionados
		l = data.uid.length;
		for (i = 0; i < l; i += 1) { //converte para tipo Number
			data.uid[i] = parseInt(data.uid[i]);
		}
		l = clients.length;
		for (i = 0; i < l; i += 1) {
			if (data.uid.indexOf(clients[i].uid) !== -1) {
				clients[i].socket.send(JSON.stringify(msg));
			}
		}
	}

};

/**
executa uma ação
 */
Client.prototype.exec = function (data) {
	var i,
	error = {};
	try {
		data = JSON.parse(data);
	} catch (e) {

		error.error = {
			type : "invalid json"
		};
		this.socket.send(JSON.stringify(error));
		return;
	}

	//trata envio de mensagem
	if (data.hasOwnProperty('send')) {
		this.sendMessage(data);
		return;
	}

	//ação do client
	if (this.command.hasOwnProperty(data.c)) {
		this.action[this.command[data.c]](this, data);
		return;
	}

	// ação do place
	if (typeof this.place.action[this.place.command[data.c]] === 'function') {
		this.place.action[this.place.command[data.c]](this, data);
	}

};

/**
trata perda de conexão
*/
Client.prototype.close = function (data){
	var i, oldplace = this.place;
	oldplace.removeClient(this);
		//se é room, avisa outros
	if(oldplace.type === "room"){
		result = {leave : this.uid};
		for(i = 0; i < oldplace.clients.length; i += 1){
			oldplace.clients[i].socket.send(JSON.stringify(result));
		}
	}	
};

/**
retorna um resumo do cliente
 */
Client.prototype.abstract = function () {
	var abstract = {
		uid : this.uid,
		locked : this.locked,
		place : {
			type : this.place.type,
			uid : this.place.uid
		}
	};
	return abstract;
};

/**
define mapa de comandos
 */
Client.prototype.command = {

	"cl1" : "getProp",
	"cl2" : "setProp",
	"cl3" : "unsetProp",
	"cl4" : "getInfo",
	"cl5" : "lock",
	"cl6" : "unlock"
};

module.exports = Client;

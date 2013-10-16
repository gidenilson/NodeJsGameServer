module.exports = (function () {
	var client,
	    jdata,
	    can,
	    toDo,
	    that = this;

	can = function () {
		return jdata.login === undefined;
	};
	toDo = function () {
		var key,
		clients = client.mediator.clients;
		for (key in clients) {
			if (clients[key] != client) {
				clients[key].socket.write(JSON.stringify(jdata).toString());
			}
		}

	};
	return function (cli, jda) {		
		client = cli;
		jdata = jda;
		if (can()) {
			toDo();
		}
	};
}());

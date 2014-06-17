module.exports = (function () {
	var client,
	    data,
	    can,
	    toDo,
	    that = this;

	can = function () {
		// verifica se � uma requisi��o
		return data.login === undefined && data.get === undefined;
	};
	toDo = function () {
		var key,
			clients = client.place.getClients();
		for (key in clients) {
		    clients[key].send(JSON.stringify(data));
		}
	};
	return function (cli, dat) {
		client = cli;
		data = dat;
		if (can()) {
			toDo();
		}
	};
}());

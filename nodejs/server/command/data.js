module.exports = (function () {
	var client,
	    data,
	    can,
	    toDo,
	    that = this;

	can = function () {
		// verifica se é uma requisição
		return data.login === undefined;
	};
	toDo = function () {
		var key,
			clients = client.place.getClients();
		for (key in clients) {
			if (clients[key] !== client) {
				clients[key].send(JSON.stringify(data));
			}
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

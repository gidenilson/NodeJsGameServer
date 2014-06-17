module.exports = (function () {
	var client,
		data,
		can,
		toDo,
		that = this;

	can = function () {
		// verifica se é uma requisição
		return data.get === "list";
	};
	toDo = function () {
		var clients = client.place.getClients(),
			list = [],
			i;
		for (i = 0; i < clients.length; i += 1) {
			list.push(clients[i].uid);
		}
		client.send('{"list" : ' + JSON.stringify(list) + '}');
		
	};
	return function (cli, dat) {
		client = cli;
		data = dat;
		if (can()) {
			toDo();
		}
	};
}());

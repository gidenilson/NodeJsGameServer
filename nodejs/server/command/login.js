module.exports = (function () {
	var user = "user",
	password = "pass",
	client,
	data,
	can,
	toDo,
	that = this;

	can = function () {
		// É solicitação de login ?
			return data.login;

	};
	toDo = function () {
		// Responde success ou failed
		if (data.login.username === user && data.login.password === password) {
			client.send('{"login" : "'+client.uid+'"}');
			client.mediator.transferTo(client, client.mediator.patio);

			
		} else {
			client.send('{"login" : "0"}');
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

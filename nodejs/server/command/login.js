module.exports = (function () {
	var user = "user",
	password = "pass",
	client,
	jdata,
	can,
	toDo,
	that = this;

	can = function () {
		return jdata.login;
	};
	toDo = function () {
		if (jdata.login.user === user && jdata.login.password === password) {
			client.mediator.transferTo(client, client.mediator.patio);
			console.log("acesso permitido: " + client.uid);
		} else {
			console.log("acesso negado: " + client.uid);
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

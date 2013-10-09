module.exports = function () {
	var login,
	close,
	end,
	client,
	setHandlers;
	login = function (data) {
		console.log(client.name + " solicitando login: " + data.toString());
	};
	close = function (had_error) {
		console.log(client.name + " fechou conexão ");
	};
	end = function () {
	    console.log(client.name + " saiu da sala ");
	};
	setHandlers = function (c) {
		client = c;
		client.on('data', login);
		client.on('close', close);
		client.on('end', end);
	};
	return setHandlers;

}();

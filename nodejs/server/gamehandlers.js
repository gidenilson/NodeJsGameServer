module.exports = function () {
	var login,
	close,
	setHandlers;
	login = function (data) {
		console.log("solicitando login: " + data.toString());
	};
	close = function (had_error) {
		console.log("conexão fechada" + data.toString());
	};
	setHandlers = function (client) {
		client.on('data', login);
	};
	return setHandlers;

}();
module.exports = (function () {
	
	var uid = 0,
		objectType = "client";

	return function (s) {
		// Vari�veis e fun��es 
		var socket = s,
			send,
			place;
		uid += 1;

		send = function (data) {
			socket.send(data);
		};
		return {
			uid : uid,
			objectType : objectType,
			socket : socket,
			place : place,
			send : send
		};
	};
}());

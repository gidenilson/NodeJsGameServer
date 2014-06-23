module.exports = function (c) {
	var message = {
		enter : {
			type : this.type,
			uid : this.uid
		}
	};
	if (c.class === 'Client') {
		this.clients.push(c);
		c.place = this;
		//c.socket.send(JSON.stringify(message));
	}
};


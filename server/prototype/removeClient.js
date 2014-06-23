module.exports = function (c) {
	var i,
	message = {
		exit : {
			type : this.type,
			uid : this.uid
		}
	};
	if (c.class === 'Client') {
		for (i = 0; i < this.clients.length; i += 1) {
			if (c === this.clients[i]) {
				this.clients.splice(i, 1);
				c.place = this.container;
				//c.socket.send(JSON.stringify(message));
				return true;
			}
		}
	}
	return false;

};


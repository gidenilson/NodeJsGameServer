module.exports = function (c) {
	var i,
	cl,
	msg = {
		removed : {
			leave : c.uid,
			enter : c.container.uid
		}
	};
	for (i = 0; i < c.clients.length; i += 1) {
		cl = c.clients[i];
		cl.socket.send(JSON.stringify(msg));
		cl.place = this;
		//console.log(cl);

	}
	this.removeContent(c);

};


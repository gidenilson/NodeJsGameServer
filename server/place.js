var uid = 0, fs = require('fs'), files;
/**
 construtor
 */
var Place = function(t) {
    uid += 1;
    this.uid = uid;
    this.type = t;
    this.locked = false;
    this.container = null;
    this.contents = [];
    this.clients = [];
    this.prop = {};
    //this.action = {};
    //this.command = {};
};



/**
 adiciona um place
 */
Place.prototype.addContent = function(c) {
    if (c instanceof Place) {
        this.contents.push(c);
        c.container = this;
    } else {
        console.log('error : place.js -> addContent');
    }
};

/**
 retorna resumo do place
 */
Place.prototype.abstract = function() {
    var abstract = {
        type: this.type,
        uid: this.uid,
        locked: this.locked

    };
    return abstract;
};

/**
 adiciona um cliente
 */
Place.prototype.addClient = function(c) {
    var message = {
        enter: {
            type: this.type,
            uid: this.uid
        }
    };
    if (c.class === 'Client') {
        this.clients.push(c);
        c.place = this;
        //c.socket.send(JSON.stringify(message));
    }
};

/**
 distroi um conteúdo
 */
Place.prototype.destroyContent = function(c) {
    var i,
            cl,
            msg = {
        removed: {
            leave: c.uid,
            enter: c.container.uid
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
/**
 * retorna propriedades
 */
Place.prototype.getProp = function(p) {
    if (this.prop.hasOwnProperty(p)) {
        return this.prop[p];
    }
};
/**
 retorna o tipo do place
 */
Place.prototype.getType = function() {
    return this.type;
};

/**
 retorna lista de clientes
 */
Place.prototype.listClient = function(p) {
    var i, x,
            result = [];
    for (i = 0; i < this.clients.length; i += 1) {
        result.push({uid : this.clients[i].uid});
        //acrescenta propriedades solicitadas
        if (p) {
            for (x = 0; x < p.length; x++) {
                //console.log(p[x]);
                if (this.clients[i].prop.hasOwnProperty(p[x])) {
                    result[i][p[x]] = this.clients[i].prop[p[x]];
                }
            }
        }
    }
    return result;
};

/**
 * remove um cliente
 * @param {type} c
 * @returns {Boolean}
 */
Place.prototype.removeClient = function(c) {
    var i,
            message = {
        exit: {
            type: this.type,
            uid: this.uid
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

/**
 * define uma propriedade
 * @param {type} p
 * @param {type} v
 * @returns {undefined}
 */
Place.prototype.setProp = function(p, v) {
    if (typeof p === 'string') {
        this.prop[p] = v;
    }
};

/**
 * remove uma propriedade
 * @param {type} p
 * @returns {undefined}
 */
Place.prototype.unsetProp = function(p) {
    if (this.prop.hasOwnProperty(p)) {
        delete this.prop[p];
    }
};

/**
 remove um place
 */
Place.prototype.removeContent = function(c) {
    var i;
    if (c instanceof Place) {
        for (i = 0; i < this.contents.length; i += 1) {
            if (c === this.contents[i]) {
                this.contents.splice(i, 1);
                c.container = null;
                return true;
            }
        }
    }
    return false;

};

/**
 cria um place
 */
Place.prototype.createContent = function() {
    var c,
            createType = this.types[this.type].create;
    if (createType) {
        c = new Place(createType);
        this.addContent(c);
        return c;
    } else {
        return false;
    }

};



/**
 ações
 */
Place.prototype.action = {};
/**
 envia lista de places contidos
 */
Place.prototype.action.listContent = function(client, data) {
    var i, x,
            result = {
        c: data.c,
        p: []
    };

    for (i = 0; i < client.place.contents.length; i += 1) {

        result.p.push({
            uid: client.place.contents[i].uid,
            type: client.place.contents[i].type
        });
        //acrescenta propriedades solicitadas
        if (data.p) {
            for (x = 0; x < data.p.length; x++) {
                //console.log(data.p[x]);
                if (client.place.contents[i].prop.hasOwnProperty(data.p[x])) {
                    result.p[i][data.p[x]] = client.place.contents[i].prop[data.p[x]];
                }
            }
        }


    }
    client.socket.send(JSON.stringify(result));
};

/**
 entra num place
 */
Place.prototype.action.enter = function(client, data) {
    var i,
            place,
            result = {
        c: data.c
    },
    oldplace = client.place;
    for (i = 0; i < client.place.contents.length; i += 1) {
        place = client.place.contents[i];
        data.p.uid = parseInt(data.p.uid);
        if (place.uid === data.p.uid) {

            if (place.locked) { //não entra em place bloqueado
                return;
            }
            oldplace.removeClient(client);
            place.addClient(client);
            client.place = place;
            result.p = {
                leave: oldplace.uid,
                enter: place.uid
            };
            client.socket.send(JSON.stringify(result));
            //se é room, avisa outros
            if (place.type === "room") {
                result = {
                    enter: client.uid
                };
                for (i = 0; i < place.clients.length; i += 1) {
                    if (place.clients[i].uid !== client.uid) {
                        place.clients[i].socket.send(JSON.stringify(result));
                    }

                }
            }
            return;
        }
    }

};

/**
 sai do place
 */
Place.prototype.action.leave = function(client, data) {
    var i,
            place,
            result = {
        c: data.c
    },
    oldplace = client.place;

    //desconecta se é servidor
    if (client.place.type === "server") {
        client.socket.close();
        return;
    }

    place = client.place.container;

    oldplace.removeClient(client);
    place.addClient(client);
    client.place = place;
    result.p = {
        leave: oldplace.uid,
        enter: place.uid
    };
    client.socket.send(JSON.stringify(result));

    //se é room, avisa outros
    if (oldplace.type === "room") {
        result = {
            leave: client.uid
        };
        for (i = 0; i < oldplace.clients.length; i += 1) {
            oldplace.clients[i].socket.send(JSON.stringify(result));
        }
    }

};

/**
 envia informações básicas do place
 */
Place.prototype.action.getInfo = function(client, data) {
    var info = {
        c: data.c,
        p: client.place.abstract()
    };
    client.socket.send(JSON.stringify(info));

};

/**
 envia propriedades
 */
Place.prototype.action.getProp = function(client, data) {
    var i,
            result = {
        c: data.c,
        p: {}

    };

    if (typeof data.p === 'undefined') {
        result.p = client.place.prop;
    } else {
        for (i = 0; i < data.p.length; i += 1) {
            if (client.place.prop.hasOwnProperty(data.p[i])) {
                result.p[data.p[i]] = client.place.prop[data.p[i]];
            }
        }
    }
    client.socket.send(JSON.stringify(result));

};

/**
 define propriedades
 */
Place.prototype.action.setProp = function(client, data) {
    var p,
            result = {};
    for (p in data.p) {
        if (data.p.hasOwnProperty(p)) {
            client.place.setProp(p, data.p[p]);
        }

    }
    result.c = data.c;
    client.socket.send(JSON.stringify(result));
};

/**
 destroi propriedades
 */
Place.prototype.action.unsetProp = function(client, data) {
    var i;

    if (typeof data.p === 'undefined') {
        client.place.prop = {};
    } else {
        for (i = 0; i < data.p.length; i += 1) {
            if (client.place.prop.hasOwnProperty(data.p[i])) {
                delete client.place.prop[data.p[i]];
            }
        }
    }
    client.socket.send(JSON.stringify(data.c));

};

/**
 bloqueia place
 */
Place.prototype.action.lock = function(client, data) {
    client.place.locked = true;
    client.socket.send(JSON.stringify(data.c));

};

/**
 desbloqueia o place
 */
Place.prototype.action.unlock = function(client, data) {
    client.place.locked = false;
    client.socket.send(JSON.stringify(data.c));

};

/**
 cria um place
 */
Place.prototype.action.createContent = function(client, data) {
    var result = {
        c: data.c
    },
    c = client.place.createContent();
    if (c) {
        result.p = {
            uid: c.uid,
            type: c.type
        };
        client.socket.send(JSON.stringify(result));
    }

};

/**
 destroi um place
 */
Place.prototype.action.destroyContent = function(client, data) {
    var i,
            place,
            result = {
        c: data.c
    };
    for (i = 0; i < client.place.contents.length; i += 1) {
        place = client.place.contents[i];
        data.p.uid = parseInt(data.p.uid);
        if (place.uid === data.p.uid) {
            client.place.destroyContent(place);
            client.socket.send(JSON.stringify(result));
            return;
        }
    }

};

/**
 envia lista de clientes
 */
Place.prototype.action.listParticipant = function(client, data) {
    var result = {
        c: data.c,
        p: client.place.listClient(data.p)
    };
    client.socket.send(JSON.stringify(result));
};

/**
 mapa de comandos
 */
Place.prototype.command = {
    "pl1": "getProp",
    "pl2": "setProp",
    "pl3": "unsetProp",
    "pl4": "getInfo",
    "pl5": "listContent",
    "pl6": "enter",
    "pl7": "leave",
    "pl8": "lock",
    "pl9": "unlock",
    "pl10": "listParticipant",
    "pl11": "createContent",
    "pl12": "destroyContent"
};
Place.prototype.types = {
    "server": {
        create: "lobby"
    },
    "lobby": {
        create: "room"
    },
    "room": {
        create: false
    }
};

module.exports = Place;

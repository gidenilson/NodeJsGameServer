module.exports = function(c) {
    if (c instanceof this.constructor) {
        this.contents.push(c);
        c.container = this;
    } else {
        console.log('error : place.js -> addContent');
    }
};




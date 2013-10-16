module.exports = (function () {
	var uid = 0,
	    place;
	
	return function (s) {
		uid += 1;
		return {
			uid : uid,
			socket : s,
			place : place
		};
	};
}());




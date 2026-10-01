var newObject = require('../newObject')
var reset = require('./mockContext/reset');

function _new(originalFallback, thisArg) {
	var c = newObject();
	c = reset(c,originalFallback,thisArg);
	c.reset = function() {
		return reset(c, originalFallback, thisArg);
	};
	return c;	
}

module.exports = _new;

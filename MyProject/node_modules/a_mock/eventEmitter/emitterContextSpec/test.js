var assert = require('assert');
var test = require('node:test');
var newSut = require('../emitterContext');

(function(){
	var returned = newSut();

	test('it should set callbacks to empty array',function() {
		assert.equal(returned.callbacks.length,0);
	});
})();
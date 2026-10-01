var assert = require('assert');
var test = require('node:test');
var sut = require('../newThrow');
var error = {};

(function(){
	var thrown;
	try	{
		var _throw = sut(error);
		_throw();
	}
	catch(e) {
		thrown = e;
	}

	test('it should throw error',function() {
		assert.equal(thrown,error); 
	});
})();
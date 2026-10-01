var assert = require('assert');
var test = require('node:test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasArgument');


(function() {
	var index = 1;
	
	var sut = newSut(index);

	(function() {
		var returned = sut('a');

		test('it should return false',function() {
			assert.equal(false,returned);
		});
		
	})();


	(function() {
		var returned = sut('a','b');

		test('it should return true',function() {
			assert.equal(true,returned);
		});

	})();

})();
var assert = require('assert');
var test = require('node:test');
var newMock = require('../simple/newMock');
var newRequireMock = require('../simple/newRequireMock');

var newSut = require('../newHasEqualArgumentArray');


(function() {
	var expectedElement1 = {};
	var expectedElement2 = {};
	var expectedArg = [expectedElement1,expectedElement2];
	var index = 1;
	
	var sut = newSut(expectedArg,index);

	(function() {
		var returned = sut('arg');

		test('it should return false',function() {
			assert.equal(false,returned);
		});
		
	})();

	(function() {
		var returned = sut('arg',[expectedElement1,'wrongElement']);

		test('it should return false',function() {
			assert.equal(false,returned);
		});

	})();

	(function() {
		var returned = sut('arg',[expectedElement1,expectedElement2,'off-by-one']);

		test('it should return false',function() {
			assert.equal(false,returned);
		});

	})();


	(function() {
		var returned = sut('arg',[expectedElement1,expectedElement2]);

		test('it should return true',function() {
			assert.equal(true,returned);
		});

	})();
	
})();
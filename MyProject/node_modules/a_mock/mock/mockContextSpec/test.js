var assert = require('assert');
var test = require('node:test');
var newRequireMock = require('../../partialMock/simple/newRequireMock');

(function(){
	var newVerify = newRequireMock('../newMutableAnd');
	var sut = require('../mockContext');

	(function() {
		var verify = {};
		newVerify.expect().return(verify);	
		var returned = sut();

		test('it should set verify', function(){
			assert.equal(returned.verify,verify);
    	});
	})();

	(function() {		
		var input = {};		
		var returned = sut(input);

		test('it should return same', function(){
			assert.equal(returned,input);
    	});
	})();
})();
var assert = require('assert');
var test = require('node:test');
var newRequireMock = require('../../partialMock/simple/newRequireMock');
var newMock = require('../../partialMock/simple/newMock');

var newBinaryAnd = newRequireMock('./newBinaryAnd');
var newSut = require('../newBinaryAnd');


(function(){
	var predicate = newMock();
	var predicate2 = newMock();
	var sut = newSut(predicate,predicate2);

	(function() {
		var arg = {};
		predicate.expect(arg).return(false);		
		var returned = sut(arg);

		test('it returns false',function() {
			assert.equal(false,returned);
		});
	})();

	(function() {
		var arg = {};
		predicate.expect(arg).return(true);		
		predicate2.expect(arg).return(false);		
		var returned = sut(arg);

		test('it returns false',function() {
			assert.equal(false,returned);
		});
	})();

	(function() {
		var arg = {};
		predicate.expect(arg).return(true);		
		predicate2.expect(arg).return(true);		
		var returned = sut(arg);

		test('it returns false',function() {
			assert.equal(true,returned);
		});
	})();

	(function() {
		var binaryAnd = {};
		var predicate = {};
		var predicate2 = {};
		var expected = {};
		newBinaryAnd.expect(sut).expect(predicate).return(binaryAnd);
		newBinaryAnd.expect(binaryAnd).expect(predicate2).return(expected);
		
		var returned = sut.add(predicate,predicate2);

		test('it returns expected',function() {
			assert.equal(expected,returned);
		});
	})();
});

var assert = require('assert');
var test = require('node:test');
var newRequireMock = require('../partialMock/simple/newRequireMock');
var newMock = require('../partialMock/simple/newMock');

var and = newRequireMock('./and');
var newSut = require('../newMutableAnd');

(function(){
	var sut = newSut();

	(function() {
		var arg = {};
		var expected = {};
		and.expect(arg).return(expected);
		var returned = sut(arg);

		test('it returns expected',function() {
			assert.equal(returned,expected);
		});

	})();

	(function() {
		var predicate = {};
		var add = newMock();			
		var and2 = newMock();
		and.add = add;
		add.expect(predicate).return(and2);
		sut.add(predicate);

		(function() {
			var arg = {};
			var expected = {};
			and2.expect(arg).return(expected);
			var returned = sut(arg);
	
			test('it returns expected',function() {
				assert.equal(returned,expected);
			});				
		})();
	})();
})();


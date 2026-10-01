var assert = require('assert');
var test = require('node:test');
var arg1 = 'a';
var arg2 = {};
var arg3 = 'c';
var errorMsg = "Unexpected arguments: a [object Object] c."
var thrownErrorMsg;

(function(){
	var sut = require('../throwUnexpectedArguments');
	try	{
		sut(arg1,arg2,arg3);
	}
	catch(error) {
		thrownErrorMsg = error && error.message;
	}

	test('it should throw correct msg', function(){
		assert.equal(errorMsg,thrownErrorMsg);
    });

})();
var assert = require('assert');
var test = require('node:test');
var sut = require('../add');

(function(){

	(function() {
		var context = {};
		var callbacks = [{}];
		context.callbacks = callbacks;
		var callback = {};

		sut(context,callback);
		
		test('it should add callback to callbacks',function() {
			assert.equal(callbacks[1],callback);
		});
	})();

})();
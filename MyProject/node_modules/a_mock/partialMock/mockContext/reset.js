var newFallbackWrapper = require('../newFallbackWrapper');
var newAnd = require('../../newMutableAnd')

function _new(mockContext,originalFallback,thisArg) {
	var and = newAnd();	
	mockContext.execute = newFallbackWrapper(originalFallback, thisArg);
	mockContext.originalFallback = originalFallback;
	mockContext.thisArg = thisArg;
	mockContext.lastExecute = mockContext.execute;
	mockContext.compositeAreCorrectArguments = and;
	mockContext.expectCount = 0;
	
	return mockContext;
}

module.exports = _new;

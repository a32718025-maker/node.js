function execute(returnValue,fallback,hasCorrectArguments,mockContext,shouldDecrementExpectCount,whenCalledEmitter) {	
	var negotiateDecrementExpectCount = require('./negotiateDecrementExpectCount');

	var index = 6;
	var args = [];
	while(index < arguments.length) {
		args.push(arguments[index]);
		index++;
	}
	if (hasCorrectArguments.apply(null,args)) {
		negotiateDecrementExpectCount(shouldDecrementExpectCount,mockContext);
		whenCalledEmitter.emit.apply(null,args);
		return returnValue;
	}
		
	var receiver = mockContext && mockContext.thisArg != null ? mockContext.thisArg : this;
	return fallback.apply(receiver,args);
}

module.exports = execute;

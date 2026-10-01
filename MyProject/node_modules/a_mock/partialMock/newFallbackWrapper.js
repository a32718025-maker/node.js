var getStackTrace = require('./fallbackWrapper/getStackTrace');

function _new(originalFallback, thisArg) {

	var fallback = originalFallback;
	var fallbackThis = thisArg;

	function execute() {
		Error.stackTraceLimit = Error.stackTraceLimit + 2;
		try {
			var receiver = fallbackThis != null ? fallbackThis : this;
			return fallback.apply(receiver,arguments);	
		}
		catch (e) {			
			if (e.name == 'Mock Error') {
  				e.stack = e.name + ': ' + e.message + '\n' + getStackTrace();
			}
			throw e;
		}
		finally {
			Error.stackTraceLimit = Error.stackTraceLimit - 2;
		}

	}

	execute.setFallback = function(fallback2, thisArg2) {
		fallback = fallback2;
		if (arguments.length > 1)
			fallbackThis = thisArg2;
	};

	return execute;
}

module.exports = _new;

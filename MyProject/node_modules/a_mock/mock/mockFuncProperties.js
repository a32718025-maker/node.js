var propertyMock = require('./propertyMock');

function collectPropertyNames(subject) {
	var names = {};
	for (var name in subject) {
		names[name] = true;
	}
	var proto = Object.getPrototypeOf(subject);
	while (proto && proto !== Object.prototype && proto !== Function.prototype) {
		var props = Object.getOwnPropertyNames(proto);
		for (var i = 0; i < props.length; i++) {
			var prop = props[i];
			if (prop === 'constructor' || names[prop])
				continue;
			var desc = Object.getOwnPropertyDescriptor(proto, prop);
			if (desc && typeof desc.value === 'function')
				names[prop] = true;
		}
		proto = Object.getPrototypeOf(proto);
	}
	return Object.keys(names);
}

function execute(subject,mockObject) {
	if (!(subject instanceof Object))
		return;
	var mockFuncProperties = require('./mockFuncProperties');
	var propertyNames = collectPropertyNames(subject);
	for(var i = 0; i < propertyNames.length; i++) {
		var propertyName = propertyNames[i];
		var property = subject[propertyName];
		var mockProperty = mockObject[propertyName];
		if (property instanceof Function)
			subject[propertyName] = propertyMock(subject,propertyName,mockProperty);
		mockFuncProperties(property,mockProperty);
	}
}

module.exports  = execute;

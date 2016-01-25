
((module) => {
	'use strict';

	var XIterable = require('x-iterable/create-class');

	class PureObjectIterable {
		
	};

	class ObjectIterable extends XIterable(PureObjectIterable) {};

	module.exports = ObjectIterable;

})(module);

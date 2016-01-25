
((module) => {
	'use strict';

	var XIterable = require('x-iterable/create-class');
	var Element = require('./element.js');

	var _key_iterator = Symbol.iterator;

	class PureObjectIterable {

		constructor(object) {
			this.object = object;
		}

		* [_key_iterator]() {
			
		}

	};

	class ObjectIterable extends XIterable(PureObjectIterable) {};

	ObjectIterable.PureObjectIterable = ObjectIterable.Pure = ObjectIterable.Base = PureObjectIterable;

	module.exports = ObjectIterable;

})(module);

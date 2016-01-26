
((module) => {
	'use strict';

	var XIterable = require('x-iterable/create-class');
	var Element = require('./element.js');

	var _key_iterator = Symbol.iterator;

	var _list = (object, properties) =>
		new XIterable.Yield(properties).transform((property) => new Element(object, property));

	class PureObjectIterable {

		constructor(object) {
			this.object = object;
		}

		* [_key_iterator]() {
			yield * this.getOwnPropertyNames();
			yield * this.getOwnPropertySymbols();
		}

		getOwnPropertyNames() {
			return _list(this.object, Object.getOwnPropertyNames(this.object));
		}

		getOwnPropertySymbols() {
			return _list(this.object, Object.getOwnPropertySymbols(this.object));
		}

		getEnumerablePropertyNames() {
			return new EnumerablePropertyNames(this.object);
		}

		assign(target) {
			this.forEach((element) => Object.defineProperty(target, element.property, element.descriptor));
		}

	};

	class ObjectIterable extends XIterable(PureObjectIterable) {};

	ObjectIterable.PureObjectIterable = ObjectIterable.Pure = ObjectIterable.Base = PureObjectIterable;

	module.exports = ObjectIterable;

	class EnumerablePropertyNames extends XIterable.fromGenerator(generateForIn) {}

	function * generateForIn(object) {
		for (let pname in object) {
			yield new Element(object, pname);
		}
	}

})(module);

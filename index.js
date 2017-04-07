'use strict'
var XIterable = require('x-iterable/create-class')
var Element = require('./element.js')
var {iterator} = Symbol

var _list = (object, properties) =>
  new XIterable.Yield(properties).transform((property) => new Element(object, property))

class PureObjectIterable {
  constructor (object) {
    this.object = object
  }

  * [iterator] () {
    yield * this.getOwnPropertyNames()
    yield * this.getOwnPropertySymbols()
  }

  getOwnPropertyNames () {
    return _list(this.object, Object.getOwnPropertyNames(this.object))
  }

  getOwnPropertySymbols () {
    return _list(this.object, Object.getOwnPropertySymbols(this.object))
  }

  getEnumerablePropertyNames () {
    return new EnumerablePropertyNames(this.object)
  }

  assign (target) {
    this.forEach(({property, descriptor}) => Object.defineProperty(target, property, descriptor))
  }

  hasOwnProperty (property) {
    return this[typeof property === 'symbol' ? 'hasOwnPropertySymbol' : 'hasOwnPropertyName'](property)
  }

  hasOwnPropertyName (pname) {
    return this.getOwnPropertyNames().some(this.FIND_PROPERTY(pname))
  }

  hasOwnPropertySymbol (psymbol) {
    return this.getOwnPropertySymbols().some(this.FIND_PROPERTY(psymbol))
  }

  FIND_PROPERTY (property) {
    return (element) =>
      element.property === property
  }
}

class ObjectIterable extends XIterable(PureObjectIterable) {}
ObjectIterable.PureObjectIterable = ObjectIterable.Pure = ObjectIterable.Base = PureObjectIterable
module.exports = ObjectIterable
class EnumerablePropertyNames extends XIterable.fromGenerator(generateForIn) {}

function * generateForIn (object) {
  for (const pname in object) {
    yield new Element(object, pname)
  }
}
